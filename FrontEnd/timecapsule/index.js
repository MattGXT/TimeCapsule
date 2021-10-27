import mbtn from './src/components/button/Default'
import minput from './src/components/input/Text'
import mtextarea from './src/components/input/Textarea'

const components = [
    mbtn,
    minput,
    mtextarea
]

const install = function(app){
    components.forEach(component => {
        app.component(component.name, component);
      });

}

export default{
    install
}