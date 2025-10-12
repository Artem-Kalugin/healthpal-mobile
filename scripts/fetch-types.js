import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import fetch from 'node-fetch';
import openapiTS, { astToString } from 'openapi-typescript';
import { Project } from 'ts-morph';
import ts from 'typescript';

import { prettify } from './utils.js';

const BE_API_DOCS_JSON_PATH = 'http://localhost:3000/api-json';

const PARSED_SCHEMA_LOCAL_PATH = './generated/schema.ts';
const __ENTITIES_LOCAL_PATH = './generated/__entities.ts';
const ENTITIES_LOCAL_PATH = './generated/entities.ts';
const BACKUP_DOCS_PATH = './scripts/api-backup.json';

const backupDocs = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), 'api-backup.json'),
    'utf-8',
  ),
);

const start = async () => {
  await updateSchema();

  const entities = getEntitiesMapping();

  generatingEntitiesFile(entities);

  //todo: uncomment if you need to override public generatied/api/entities;
  // generatingOverrideFile(entities);
};

function excludeNotExposedData(ast, interfaceName = 'paths') {
  ast.forEach((node, idx) => {
    if (!ts.isInterfaceDeclaration(node)) return;

    if (node.name.text !== interfaceName) return;

    const newMembers = [];

    node.members.forEach(member => {
      if (!ts.isPropertySignature(member)) {
        newMembers.push(member);
        return;
      }

      const typeNode = member.type;

      if (typeNode && ts.isTypeLiteralNode(typeNode)) {
        const filteredMembers = typeNode.members.filter(m => {
          if (!ts.isPropertySignature(m)) return true;
          const t = m.type;
          return !(t && t.kind === ts.SyntaxKind.NeverKeyword);
        });

        const newTypeNode = ts.factory.updateTypeLiteralNode(
          typeNode,
          filteredMembers,
        );

        const newMember = ts.factory.updatePropertySignature(
          member,
          member.modifiers,
          member.name,
          member.questionToken,
          newTypeNode,
        );
        newMembers.push(newMember);
      } else {
        newMembers.push(member);
      }
    });

    ast[idx] = ts.factory.updateInterfaceDeclaration(
      node,
      node.modifiers,
      node.name,
      node.typeParameters,
      node.heritageClauses,
      newMembers,
    );
  });

  return ast;
}

async function updateSchema() {
  let docsJson;
  let usingBackup = false;
  try {
    const res = await fetch(BE_API_DOCS_JSON_PATH);

    docsJson = await res.json();
    console.log('Using schema from api', BE_API_DOCS_JSON_PATH);
  } catch (e) {
    console.log(e);
    usingBackup = true;
    docsJson = backupDocs;
    console.log('Using backup schema');
  }

  const ast = await openapiTS(docsJson);

  const astTransformed = excludeNotExposedData(
    excludeNotExposedData(ast, 'paths'),
    'operations',
  );
  const parsedTypesciptScheme = astToString(astTransformed);

  writeFileSync(
    PARSED_SCHEMA_LOCAL_PATH,
    await prettify(parsedTypesciptScheme),
  );
  console.log('file written');

  if (!usingBackup) {
    writeFileSync(BACKUP_DOCS_PATH, JSON.stringify(docsJson));
    console.log('Backup is stale, overrided');
  }

  console.log('Sucessfully written schema at path', PARSED_SCHEMA_LOCAL_PATH);

  // generatingOverrideFile();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getEntitiesMapping = () => {
  console.log('Getting entites from components/schemas');

  const project = new Project();
  const file = project.addSourceFileAtPath(PARSED_SCHEMA_LOCAL_PATH);

  const componentsInterface = file.getInterface('components');
  if (!componentsInterface) {
    console.error("Couldn't find 'components' interface.");
    process.exit(1);
  }

  const schemasProperty = componentsInterface.getProperty('schemas');
  if (!schemasProperty) {
    console.error(
      "Couldn't find 'schemas' property in 'components' interface.",
    );
    process.exit(1);
  }

  const definedModels = [];
  schemasProperty.getTypeNode().forEachChild(node => {
    const entityName = node.getText().split(':')[0];
    entityName &&
      definedModels.push({
        name: capitalizeFirstLetter(entityName),
        value: entityName,
      });
  });

  return definedModels;
};

const generatingEntitiesFile = async entities => {
  let content = `
  import { components } from './schema';
  `;

  entities.forEach(
    entity =>
      (content += `
  export type BE${entity.name} = components['schemas']['${entity.value}'];`),
  );

  writeFileSync(__ENTITIES_LOCAL_PATH, await prettify(content));

  console.log(
    'Sucessfully written private entities at path',
    __ENTITIES_LOCAL_PATH,
  );
};

const generatingOverrideFile = async entities => {
  let content = `
  import { ${entities
    .map(el => `BE${el.name}`)
    .join(',')} } from './generated/__entities';
  `;

  entities.forEach(
    entity =>
      (content += `
  export type DTO${entity.name} = BE${entity.name} `),
  );

  writeFileSync(ENTITIES_LOCAL_PATH, prettify(content));

  console.log(
    'Sucessfully written public entities at path',
    ENTITIES_LOCAL_PATH,
  );
};

start();
