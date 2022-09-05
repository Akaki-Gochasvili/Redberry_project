document.querySelector('.first_name').value = localStorage.getItem(`first_name`);
document.querySelector('.last_name').value = localStorage.getItem(`last_name`);
document.querySelector('.mail').value = localStorage.getItem(`mail`);
document.querySelector('.number').value = localStorage.getItem(`number`);


const teams_table = document.querySelector('#teams');
const postitions_table = document.querySelector('#position');
let positions_data = [];

fetch('https://pcfy.redberryinternship.ge/api/teams')
    .then((response) => response.json())
    .then((teams) => {
        teams.data.forEach(team => {
            const select_team = document.createElement("option")

            select_team.value = team.id
            select_team.appendChild(
                document.createTextNode(
                    `${team.name}`
                )
            );
            if (localStorage.getItem('team') === `${team.id}`) {
                select_team.selected = true
                selectedPosition(team.id)
            }
            teams_table.appendChild(select_team)
        });

    });

fetch('https://pcfy.redberryinternship.ge/api/positions')
    .then(response => response.json())
    .then(positions => {
        positions.data.forEach(position => {
            positions_data.push(position)
        });
    });


let positions_table = document.querySelector('#positions');
const selectedPosition = async (value) => {
    let proper_positions = await positions_data.filter(position => `${position.team_id}` === `${value}`);


    await proper_positions.forEach(position => {
        const select_position = document.createElement("option")

        select_position.value = position.id
        select_position.appendChild(
            document.createTextNode(
                `${position.name}`
            )
        );
        if (localStorage.getItem('position') === `${position.id}`) {
            select_position.selected = true
        }
        positions_table.appendChild(select_position)
    });
};

if (localStorage.getItem('team') !== 'თიმი') {
    selectedPosition(`${localStorage.getItem('team')}`);
}

const clearPositions = () => {
    while (positions_table.length > 1) {
        positions_table.lastElementChild.remove();
    };
}

const saveInLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
};
