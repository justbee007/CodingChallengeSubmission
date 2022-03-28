import { postData } from "./lookupService";
const val = {
    county: "Spokane",
    name: "Ahulray Aviddray",
    population: 7062
}
function fn()
{global.fetch = jest.fn(()=> {
const val = {
    county: "Spokane",
    name: "Ahulray Aviddray",
    population: 7062
}
return Promise.resolve({
    Response: () => Promise.resolve(val)
});
});
}
it("gets County Data" ,async()=>{
    const zipcodes = postData()
    expect(zipcodes).resolves
    })