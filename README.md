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
  
---
# 3. Start storybook with expo and control it with web interface

first get your device ip address

## for windows:
```
$ ipconfig /all | findstr -iv "ipv6 bluetooth Description DHCP Autoconfiguration Netbios routing wins node Connection-specific obtained expires disconnected"

Ethernet adapter VirtualBox Host-Only Network:
   IPv4 Address. . . . . . . . . . . : 192.168.56.1(Preferred)
   IPv4 Address. . . . . . . . . . . : 192.168.134.2(Preferred)
Ethernet adapter Ethernet:
   IPv4 Address. . . . . . . . . . . : 192.168.0.105(Preferred)
```
## for linux 
```
$ ip a | grep "inet " | grep -v 127.0.0.1

inet 192.168.0.105/24 brd 192.168.0.255 scope global dynamic
inet 192.168.56.1/24 brd 192.168.56.255 scope global dynamic
inet 192.168.134.2/24 brd 192.168.134.255 scope global dynamic
```
---


don't choose the VirtualBox ip address
let say we choose the ip ```192.168.0.105``` 

edit the ```storybook/index.ts``` file and change the host to selected host
```js
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null, 
  port: 7007,
  host: '192.168.0.105'
});
```


```cmd
npm run storybook -- -h 192.168.0.105
npm run android
-- or -- 
yarn storybook -h 192.168.0.105
yarn android
```

# 4. Start storybook in web browser (No need for physical device)
with the help of **```react-native-web```**  to render **React Native** component 

```
npm run storybook:web
-- or -- 
yarn storybook:web
```

# 5. build storybook
the build file will be generate at **```storybook-static```** directory
```
npm run build-storybook
-- or -- 
yarn build-storybook
```

# 6. TIPS: VSCode Snippets
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
