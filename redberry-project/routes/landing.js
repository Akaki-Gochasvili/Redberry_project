const { Router } = require('express');
const router = Router();

router.get('/', (request, respone) => {
    respone.render('landing', {
        page_title: "Redberry Project | Landing",
    });
});

module.exports = router;
