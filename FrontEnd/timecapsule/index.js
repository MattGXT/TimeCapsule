import mbtn from './src/components/button/Default'
import minput from './src/components/input/Text'

const components = [
    mbtn,
    minput
]

const install = function(app){
    components.forEach(component => {
        app.component(component.name, component);
      });

}

export default{
    install
}