class Phone {
    constructor(json)
    {
        Object.assign(this,json);
        console.log(this);
    }

    getModel() {
        return this.model;
    }
}

const phonePriceData = [
    {
        "model":"iPhone 6 Plus",
        "newPrice":"null",
        "usedGoodPrice":"55",
        "scratchFee":"10",
        "crackedScreenFee":"25"
    },
    {
        "model":"iPhone 6S Plus",
        "newPrice":"70",
        "usedGoodPrice":"65",
        "scratchFee":"10",
        "crackedScreenFee":"30"
    },
    {
        "model":"iPhone 7",
        "newPrice":"null",
        "usedGoodPrice":"null",
        "scratchFee":"10",
        "crackedScreenFee":"30"
    },
    {
        "model":"iPhone 7 Plus",
        "newPrice":"100",
        "usedGoodPrice":"90",
        "scratchFee":"15",
        "crackedScreenFee":"30"
    }
];

$(document).ready(function() {
    phonePriceData.forEach(phoneJSON => {
        let newPhone = new Phone(phoneJSON);
        console.log(newPhone + "\nObject Created");
        console.log(newPhone.getModel())
        $("#model-selection").append(`<option value="${newPhone}">${newPhone.getModel()}</option>`);
    });
});

