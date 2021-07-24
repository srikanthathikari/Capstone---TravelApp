import { handleSubmit } from "../src/client/js/app";
import { getCoordinates } from "../src/client/js/app";


describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
           expect(handleSubmit).toBeDefined();
})});

describe("Testing geoLocation Reponse", () =>{
    console.log('test case 2');
    test("Testing the getCoordinates() function", () =>{
        expect(getCoordinates).toBeDefined();
    })
})