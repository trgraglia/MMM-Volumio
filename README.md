# MMM-Volumio

## Install
- Clone repo into your MagicMirror folder.
```
cd ~/MagigMirror/modules/
git clone https://github.com/trgraglia/MMM-Volumio
```
- Install npm packages
```
cd MMM-Volumio
npm install
```

## Setup
- Find out your Volumio IP
- Add the module to the MagicMirror config
```javascript
{
  module: 'MMM-Volumio',
  position: 'bottom_right',
  header: 'Volumio',
  config: {
    volumioUrl: '<volumio ip from above>'
  }
},
```
