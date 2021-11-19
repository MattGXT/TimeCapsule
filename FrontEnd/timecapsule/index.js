import mbtn from './src/components/button/Default'
import minput from './src/components/input/Text'
import mtextarea from './src/components/input/Textarea'
import mAlert from './src/components/alert/Alert'
import mModal from './src/components/alert/Modal'

const components = [
    mbtn,
    minput,
    mtextarea,
    mAlert,
    mModal
]

const install = function(app){
    components.forEach(component => {
        app.component(component.name, component);
      });

}

export default{
    install
}