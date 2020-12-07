# Attenda App

## 1. Setup the Repo
---
```bash
npm install
-- or --
yarn 
```

## 2. Understanding The Project file structure
---

This project follows the [atomic design](https://cheesecakelabs.com/blog/rethinking-atomic-design-react-projects/) guideline
 
```
├── .storybook/ <-- storybook web configs
├── assets/ <-- static resources
├── node_modules/
├── patches/ <-- node_modules patches
├── src
│   ├── App.tsx <-- main app code
│   ├── components
│   │   ├── atoms
│   │   ├── molecules
│   │   ├── organisms
│   │   └── templates
│   ├── pages
│   ├── routes
│   └── util
│       └── constants.ts
├── storybook/ <-- react-native storybook config
├── App.tsx <-- main expo app entry file
├── app.json <--expo config
└── package.json
```

**src** folder

1. **components** where all the atomic component lives
    * **atoms:** atoms are the smallest component
    * **molecules:** molecules are a group of atoms put together with basic fundamentals of a unit.
    * **Organisms:** Organisms are blocks of our system, where we can group molecules together to form relatively more complex components, a section of the application.
    * **Templates:** They are mostly a group of organisms put together to form a final structure, this is where we begin to see the layout in action.
2. **pages:** These are instances of templates where “gaps” are filled with content, resulting in the final view that the user will see.
3. **util:** this is where all the utility function lives
  

## VSCode Snippets
```json
// press Ctrl+Shift+P and type
// Preferences: Configure User Snippets
// then press enter and select typescriptreact.json
// add this three snippets

"Create A React Native Stylesheets": {
    "prefix": "ss",
    "body": [
        "const styles = StyleSheet$1.create({",
        "\tcontainer:{",
        "\t\t$0",
        "\t}",
        "})"
    ],
    "description": "Log output to console"
},
"React Native Functional Component": {
    "prefix": "rfcc",
    "body": [
        "import React from 'react';",
        "import { StyleSheet, View } from 'react-native';",
        "",
        "const styles = StyleSheet.create({",
        "\tcontainer: {",
        "\t\t$2",
        "\t}",
        "});",
        "",
        "const ${1:${TM_FILENAME_BASE}} = () => {",
        "\treturn (",
        "\t\t<View style={styles.container}>",
        "\t\t\t$3",
        "\t\t</View>",
        "\t);",
        "};",
        "",
        "export default ${1:${TM_FILENAME_BASE}};"
    ]
},
"React Native And Web Story Template": {
    "prefix": "story",
    "body": [
        "import React from 'react';",
        "import { Button, Platform } from 'react-native';",
        "import { action } from '@storybook/addon-actions';",
        "import { withKnobs } from '@storybook/addon-knobs';",
        "import { storiesOf } from '@storybook/react-native';",
        "import ${1:${TM_FILENAME/(.stories.*)//}} from './${1:${TM_FILENAME/(.stories.*)//}}';",
        "",
        "const STORY_NAME = '${1:${TM_FILENAME/(.stories.*)//}}';",
        "",
        "// it will only work with web",
        "// because react native does not supports the modern api",
        "export default {",
        "  title: STORY_NAME,",
        "  decorators: [withKnobs],",
        "  component: ${1:${TM_FILENAME/(.stories.*)//}},",
        "};",
        "",
        "// Default For Web And android Component",
        "export const Default = (): JSX.Element => <${1:${TM_FILENAME/(.stories.*)//}} />;",
        "",
        "export const WithButton = (): JSX.Element => (",
        "  <>",
        "    <Default />",
        "    <Button title=\"Click Me\" onPress={action('Clicked!')} />",
        "  </>",
        ");",
        "",
        "// if the platform is not web only then render it",
        "// otherwise it will render 2 story in web storybook",
        "// it is the storybook legacy api react-native does not support modern api",
        "if (Platform.OS !== 'web') {",
        "  storiesOf(STORY_NAME, module)",
        "    // eslint-disable-next-line @typescript-eslint/no-explicit-any",
        "    .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)",
        "    .addDecorator(withKnobs)",
        "    .add('Default', Default)",
        "    .add('WithButton', WithButton);",
        "}",
        ""
    ],
    "description": "React Native And Web Story Template"
}
```
