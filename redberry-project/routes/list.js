const { Router } = require('express');
const router = Router();
const Laptop = require('../models/Laptop');
const axios = require('axios');

router.get('/list', async (request, respone) => {
    const records = await Laptop.find().lean();

    respone.render('list', {
        page_title: "Redberry Project | List",
        records: records
    });
});

router.get('/records/:id', async (request, response) => {
    const record = await Laptop.findById(request.params.id).lean()

    let teams = [];

    await axios
        .get('https://pcfy.redberryinternship.ge/api/teams')
        .then(teams_data => {
            teams = teams_data.data.data
        })

    const proper_team = teams.filter(team => team.id === record.team_id)

    record.team = proper_team[0].name
    
    await axios
    .get('https://pcfy.redberryinternship.ge/api/positions')
    .then(positions_data => {
        positions = positions_data.data.data
    })
    
    const proper_position = positions.filter(position => position.id === record.position_id)
    record.position = proper_position[0].name

    if (record.laptop_state === 'new') {
        record.state = "ახალი"
    } else {
        record.state = "მეორადი"
    }

    response.render('record', {
        page_title: "Redberry Project | Record",
        record: record
    });
})



module.exports = router;
