import { getzipcodes } from "./getZipCodeService";
const val = ["601", "602", "603", "606", "610", "612", "616", "617", "622", "623", "624", "627", "631", "637", "638", "641", "646",
    "647", "650", "652", "653", "656"]
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(val)
    })
);

it("gets Zip Codes", async () => {
    const zipcodes = getzipcodes()
    expect(zipcodes).resolves
})