import { mount } from "@vue/test-utils";
import HelloWorld from "../components/HelloWorld";

describe('HelloWorld Component Test', ()=>{
    test("Testing the HelloWorld", ()=> {
        const wrapper = mount(HelloWorld, {
            propsData: {
                msg:'Hello from tests!'
            }
        })

        expect(wrapper.text()).toEqual(
            'Hello from tests!'
        )
    })
})