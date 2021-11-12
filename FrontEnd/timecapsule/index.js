import mbtn from './src/components/button/Default'
import minput from './src/components/input/Text'
import mtextarea from './src/components/input/Textarea'
import mAlert from './src/components/alert/Alert'

const components = [
    mbtn,
    minput,
    mtextarea,
    mAlert
]

const install = function(app){
    components.forEach(component => {
        app.component(component.name, component);
      });

}

export default{
    install
}