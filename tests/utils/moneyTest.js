import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: format currency', ()=>{
    it('convert cents into dollars', ()=>{
        expect(formatCurrency(2095)).toEqual('20.95')
    });
    it('works with 0', ()=>{
        expect(formatCurrency(0)).toEqual('0.00')
    })
    it('rounds down', ()=>{
        expect(formatCurrency(2000.4)).toEqual('20.00')
    })
    it('negative number',()=>{
        expect(formatCurrency(-2000)).toEqual('0.00')
    })
})