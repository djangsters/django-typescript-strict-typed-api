import r2wc from '@r2wc/react-to-web-component'
import SimpleComponent from "./components/SimpleComponent";

const SimpleComponentWC = r2wc(SimpleComponent)

customElements.define('react-component', SimpleComponentWC)
