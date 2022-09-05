const { Router } = require('express');
const router = Router();

router.get('/success', (request, respone) => {
    respone.render('success', {
        page_title: "Redberry Project | SUCCESS",
    });
});

module.exports = router;
