const { Router, response } = require('express');
const imageMiddleware = require('../middlewares/image')
const imageDeleteMiddleware = require('../middlewares/image_delete')
const Laptop = require('../models/Laptop')
const router = Router();

router.get('/add-info', (request, respone) => {
    respone.render('add-info', {
        page_title: "Redberry Project | Add Info",
        errorEmptyFirstName: request.flash("errorEmptyFirstName"),
        errorWrongFirstName: request.flash("errorWrongFirstName"),
        errorEmptyLastName: request.flash("errorEmptyLastName"),
        errorWrongLastName: request.flash("errorWrongLastName"),
        errorTeam: request.flash("errorTeam"),
        errorPosition: request.flash("errorPosition"),
        errorEmptyMail: request.flash("errorEmptyMail"),
        errorWrongMail: request.flash("errorWrongMail"),
        errorNumber: request.flash("errorNumber"),
        errorNumber2: request.flash("errorNumber2"),
    });
});

router.post('/add-info', (request, response) => {

    const regex = RegExp(/^[ა-ჰ]+$/)
    let error = false

    if (!request.body.first_name || request.body.first_name.length < 2) {
        request.flash('errorEmptyFirstName', 'შეიყვანე მინიმუმ 2 სიმბოლო');
        error = true;
    };

    if (!regex.test(request.body.first_name)) {
        request.flash('errorWrongFirstName', 'გამოიყენე მხოლოდ ქართული ასოები');
        error = true;
    };

    if (!request.body.last_name || request.body.last_name.length < 2) {
        request.flash('errorEmptyLastName', 'შეიყვანე მინიმუმ 2 სიმბოლო');
        error = true;
    };

    if (!regex.test(request.body.last_name)) {
        request.flash('errorWrongLastName', 'გამოიყენე მხოლოდ ქართული ასოები');
        error = true;
    };

    if (request.body.team === 'თიმი') {
        request.flash('errorTeam', 'აირჩიე თიმი');
        error = true;
    };

    if (request.body.position === 'პოზიცია') {
        request.flash('errorPosition', 'აირჩიე პოზიცია');
        error = true;
    };

    if (!request.body.mail) {
        request.flash('errorEmptyMail', 'შეიყვანე მეილი');
        error = true;
    };

    if (request.body.mail.endsWith('@redberry.ge') === false) {
        request.flash('errorWrongMail', 'მეილი უნდა მთავრდებოდეს @redberry.ge-ით');
        error = true;
    };

    if (request.body.number.startsWith('+995') === false) {
        request.flash('errorNumber', 'შეიყვანე ქართული ნომერი');
        error = true;
    };

    if (request.body.number.length !== 13) {
        request.flash('errorNumber2', 'შეიყვანე ქართული ნომერი');
        error = true;
    };

    if (error === true) {
        response.redirect('/add-info')
    } else {
        response.redirect('/add-laptop')
    }
});

router.get('/add-laptop', (request, response) => {
    response.render('add-laptop', {
        page_title: "Redberry Project | Add Laptop",
        errorFile: request.flash("errorFile"),
        errorEmptyLaptopName: request.flash("errorEmptyLaptopName"),
        errorWrongLaptopName: request.flash("errorWrongLaptopName"),
        errorBrand: request.flash("errorBrand"),
        errorCPU: request.flash("errorCPU"),
        errorCPUCore: request.flash("errorCPUCore"),
        errorCPUThread: request.flash("errorCPUThread"),
        errorRam: request.flash("errorRam"),
        errorStorage: request.flash("errorStorage"),
        errorState: request.flash("errorState"),
        errorPrice: request.flash("errorPrice")
    });
});

router.post('/add-laptop', imageMiddleware.single("file"), async (request, response) => {
    const regex = RegExp(/^[a-zA-Z0-9!@#\s\$%\^\&*\)\(+=._-]+$/g)
    let error = false

    if (!request.file) {
        request.flash('errorFile', 'ატვირთეთ ლეპტოპის ფოტო');
        error = true;
    }

    if (!request.body.laptop_name) {
        request.flash('errorEmptyLaptopName', 'შეიყვანე ლეპტოპის სახელი');
        error = true;
    };

    if (regex.test(request.body.laptop_name) === false) {
        request.flash('errorWrongLaptopName', 'გამოიყენე შესაბამისი სიმბოლოები');
        error = true;
    };

    if (request.body.brand === 'ლეპტოპის ბრენდი') {
        request.flash('errorBrand', 'აირჩიე ლეპტოპის ბრენდი');
        error = true;
    };

    if (request.body.cpu === 'CPU') {
        request.flash('errorCPU', 'აირჩიე CPU');
        error = true;
    };

    if (!request.body.cpu_core) {
        request.flash('errorCPUCore', 'შეიყვანე CPU-ს ბირთვი');
        error = true;
    };

    if (!request.body.cpu_core) {
        request.flash('errorCPUThread', 'შეიყვანე CPU-ს ნაკადი');
        error = true;
    };

    if (!request.body.ram) {
        request.flash('errorRam', 'შეიყვანე ლეპტოპის RAM');
        error = true;
    };

    if (!request.body.storage) {
        request.flash('errorStorage', 'აირჩიე მეხსიერების ტიპი');
        error = true;
    };

    if (!request.body.state) {
        request.flash('errorState', 'აირჩიე ლეპტოპის მდგომარეობა');
        error = true;
    };

    if (!request.body.price) {
        request.flash('errorPrice', 'შეიყვანე ლეპტოპის ფასი');
        error = true;
    };


    if (error === true) {
        if (request.file) {
            await imageDeleteMiddleware(request.file.filename)
        }
        response.redirect('/add-laptop')
    } else {


        const new_laptop = await new Laptop(
            {
                name: request.body.first_name,
                surname: request.body.last_name,
                team_id: parseInt(request.body.team),
                position_id: parseInt(request.body.position),
                phone_number: request.body.number,
                email: request.body.mail,
                laptop_name: request.body.laptop_name,
                laptop_image: request.file.filename,
                laptop_brand: request.body.brand,
                laptop_cpu: request.body.cpu,
                laptop_cpu_cores: request.body.cpu_core,
                laptop_cpu_threads: request.body.cpu_thread,
                laptop_ram: request.body.ram,
                laptop_hard_drive_type: request.body.storage,
                laptop_state: request.body.state,
                laptop_purchase_date: request.body.date,
                laptop_price: request.body.price
            }
        )

        await new_laptop.save()

        response.redirect('/success')
    }

});

module.exports = router;
