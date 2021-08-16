import {mount} from "@vue/test-utils";
import Calculator from "../components/Calculator";

describe('Calculator Input Test', ()=>{

    it('Testing the operand1 input ', function () {
        const wrapper = mount(Calculator);
        const operand1 = wrapper.find('input[name=operand1]');
        operand1.setValue('1');

        expect(wrapper.vm.operand1).toBe(1);
    });

    it('Testing the operand2 input ', function () {
        const wrapper = mount(Calculator);
        const operand2 = wrapper.find('input[name=operand2]');
        operand2.setValue('2');

        expect(wrapper.vm.operand2).toBe(2);
    });

    it('Testing the sum', function () {
        const wrapper = mount(Calculator);
        const operand1 = wrapper.find('input[name=operand1]');
        const operand2 = wrapper.find('input[name=operand2]');
        operand1.setValue('5');
        operand2.setValue('5');
        const sum = wrapper.find('#sum');
        sum.trigger('click');

        expect(wrapper.vm.result).toBe(10);
    });

    it('Testing the subtr', function () {
        const wrapper = mount(Calculator);
        const operand1 = wrapper.find('input[name=operand1]');
        const operand2 = wrapper.find('input[name=operand2]');
        operand1.setValue('2');
        operand2.setValue('2');
        const subtr = wrapper.find('#subtr');
        subtr.trigger('click');

        expect(wrapper.vm.result).toBe(0);
    });

    it('Testing the mult', function () {
        const wrapper = mount(Calculator);
        const operand1 = wrapper.find('input[name=operand1]');
        const operand2 = wrapper.find('input[name=operand2]');
        operand1.setValue('2');
        operand2.setValue('2');
        const subtr = wrapper.find('#mult');
        subtr.trigger('click');

        expect(wrapper.vm.result).toBe(4);
    });

    it('Testing the divd', function () {
        const wrapper = mount(Calculator);
        const operand1 = wrapper.find('input[name=operand1]');
        const operand2 = wrapper.find('input[name=operand2]');
        operand1.setValue('8');
        operand2.setValue('2');
        const subtr = wrapper.find('#divd');
        subtr.trigger('click');

        expect(wrapper.vm.result).toBe(4);
    });

    it('Testing the divd by 0', function () {
        const wrapper = mount(Calculator);
        const operand1 = wrapper.find('input[name=operand1]');
        const operand2 = wrapper.find('input[name=operand2]');
        operand1.setValue('8');
        operand2.setValue('0');
        const subtr = wrapper.find('#divd');
        subtr.trigger('click');

        const error = wrapper.find('#error');

        expect(wrapper.vm.result).toBe('?');
        expect(error.text()).toBe('');
    });

    it('Testing the sup', function () {
        const wrapper = mount(Calculator);
        const operand1 = wrapper.find('input[name=operand1]');
        const operand2 = wrapper.find('input[name=operand2]');
        operand1.setValue('2');
        operand2.setValue('2');
        const subtr = wrapper.find('#sup');
        subtr.trigger('click');

        expect(wrapper.vm.result).toBe(4);
    });

    it('Testing the rest', function () {
        const wrapper = mount(Calculator);
        const operand1 = wrapper.find('input[name=operand1]');
        const operand2 = wrapper.find('input[name=operand2]');
        operand1.setValue('5');
        operand2.setValue('2');
        const subtr = wrapper.find('#rest');
        subtr.trigger('click');

        expect(wrapper.vm.result).toBe(2);
    });

    it('Testing the visibility of numPad block', function () {
        const wrapper = mount(Calculator);
        const numButtons = wrapper.find('.num-buttons');
        expect(numButtons.attributes().style).toBe("display: none;");
    });

    it('Testing the radiobutton numpad input 9', function () {
        const wrapper = mount(Calculator);
        // const radioButton = wrapper.find('#one');
        // radioButton.setChecked();
        const numButton = wrapper.find('#button9');
        numButton.trigger('click');
        const operand1 = wrapper.find('input[name=operand1]');

        expect(wrapper.vm.operand1).toBe(9);
    });

    it('Testing the radiobutton numpad input 8', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#two');
        radioButton.setChecked();
        const numButton = wrapper.find('#button8');
        numButton.trigger('click');
        const operand2 = wrapper.find('input[name=operand2]');

        expect(wrapper.vm.operand2).toBe(8);
    });

    it('Testing the radiobutton numpad input 7', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#one');
        radioButton.setChecked();
        const numButton = wrapper.find('#button7');
        numButton.trigger('click');
        const operand1 = wrapper.find('input[name=operand1]');

        expect(wrapper.vm.operand1).toBe(7);
    });

    it('Testing the radiobutton numpad input 6', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#two');
        radioButton.setChecked();
        const numButton = wrapper.find('#button6');
        numButton.trigger('click');
        const operand2 = wrapper.find('input[name=operand2]');

        expect(wrapper.vm.operand2).toBe(6);
    });

    it('Testing the radiobutton numpad input 5', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#one');
        radioButton.setChecked();
        const numButton = wrapper.find('#button5');
        numButton.trigger('click');
        const operand1 = wrapper.find('input[name=operand1]');

        expect(wrapper.vm.operand1).toBe(5);
    });

    it('Testing the radiobutton numpad input 4', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#two');
        radioButton.setChecked();
        const numButton = wrapper.find('#button4');
        numButton.trigger('click');
        const operand2 = wrapper.find('input[name=operand2]');

        expect(wrapper.vm.operand2).toBe(4);
    });

    it('Testing the radiobutton numpad input 3', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#one');
        radioButton.setChecked();
        const numButton = wrapper.find('#button3');
        numButton.trigger('click');
        const operand1 = wrapper.find('input[name=operand1]');

        expect(wrapper.vm.operand1).toBe(3);
    });

    it('Testing the radiobutton numpad input 2', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#two');
        radioButton.setChecked();
        const numButton = wrapper.find('#button2');
        numButton.trigger('click');
        const operand2 = wrapper.find('input[name=operand2]');

        expect(wrapper.vm.operand2).toBe(2);
    });

    it('Testing the radiobutton numpad input 1', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#one');
        radioButton.setChecked();
        const numButton = wrapper.find('#button1');
        numButton.trigger('click');
        const operand1 = wrapper.find('input[name=operand1]');

        expect(wrapper.vm.operand1).toBe(1);
    });

    it('Testing the radiobutton numpad input 0', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#two');
        radioButton.setChecked();
        const numButton = wrapper.find('#button0');
        numButton.trigger('click');
        const operand2 = wrapper.find('input[name=operand2]');

        expect(wrapper.vm.operand2).toBe(0);
    });

    it('Testing the radiobutton del key input 1', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#one');
        radioButton.setChecked();

        const numButton = wrapper.find('#button9');
        numButton.trigger('click');
        numButton.trigger('click');

        const delButton = wrapper.find('#buttondel');
        delButton.trigger('click');

        const operand1 = wrapper.find('input[name=operand1]');

        expect(wrapper.vm.operand1).toBe(9);
    });

    it('Testing the radiobutton del key input 2', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#two');
        radioButton.setChecked();

        const numButton = wrapper.find('#button9');
        numButton.trigger('click');
        numButton.trigger('click');

        const delButton = wrapper.find('#buttondel');
        delButton.trigger('click');

        const operand2 = wrapper.find('input[name=operand2]');

        expect(wrapper.vm.operand2).toBe(9);
    });

    it('Testing the radiobutton del key input 3', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#one');
        radioButton.setChecked();

        const numButton = wrapper.find('#button9');
        numButton.trigger('click');

        const delButton = wrapper.find('#buttondel');
        delButton.trigger('click');

        const operand1 = wrapper.find('input[name=operand2]');

        expect(wrapper.vm.operand1).toBe(0);
    });

    it('Testing the radiobutton del key input 4', function () {
        const wrapper = mount(Calculator);
        const radioButton = wrapper.find('#two');
        radioButton.setChecked();

        const numButton = wrapper.find('#button9');
        numButton.trigger('click');

        const delButton = wrapper.find('#buttondel');
        delButton.trigger('click');

        const operand2 = wrapper.find('input[name=operand2]');

        expect(wrapper.vm.operand2).toBe(0);
    });


})