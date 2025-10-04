module.exports = plop => {
  plop.setGenerator('icon', {
    description: 'Adds icon',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter icon name (in camelCase, e.g., leftArrow)',
        validate: input =>
          /^[a-z][a-zA-Z0-9]*$/.test(input) ? true : 'Use camelCase format',
      },
      {
        type: 'input',
        name: 'color',
        message:
          'Enter fill color (e.g., "#000" or "currentColor") — leave blank to skip',
      },
    ],
    actions: function (data) {
      return [
        {
          type: 'append',
          path: 'src/ui-kit/Icon.tsx',
          pattern: '/* PLOP_INJECT_IMPORT */',
          template:
            "import {{camelCase name}} from '#assets/icons/{{kebabCase name}}.svg';",
        },
        {
          type: 'append',
          path: 'src/ui-kit/Icon.tsx',
          pattern: '/* PLOP_INJECT_KEY */',
          template: `  {{camelCase name}}: { component: {{camelCase name}}, ${data.color && data.color.trim() ? `fill: ${data.color.startsWith('colors') ? data.color : `'${data.color}'`}` : ''},`,
        },
      ];
    },
  });
  plop.setGenerator('Image', {
    description: 'Adds image',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter image name (in camelCase, e.g., onboarding1)',
        validate: input =>
          /^[a-z][a-zA-Z0-9]*$/.test(input) ? true : 'Use camelCase format',
      },
    ],
    actions: [
      {
        type: 'append',
        path: 'src/config/index.ts',
        pattern: '/* PLOP_INJECT_IMPORT */',
        template:
          "import {{camelCase name}} from '#assets/images/{{kebabCase name}}.png';",
      },
      {
        type: 'append',
        path: 'src/config/index.ts',
        pattern: '/* PLOP_INJECT_KEY */',
        template: `  {{camelCase name}}: {{camelCase name}},`,
      },
    ],
  });
};
