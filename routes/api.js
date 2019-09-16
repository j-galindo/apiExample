const express = require('express');
const router = express.Router();
const axios = require('axios');



//thsi route is to get all the pokemon
router.get('/', (req, res, next) => {
    axios
        .get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000`)
        .then((allPokes) => {
            console.log(allPokes.data.results);
            res.render('apiViews/apiHome', { allPokes: allPokes.data.results });
        })
        .catch((err) => next(err));
});

//this route is to get unique pokecom
router.get('/poke/:pokeId', (req, res, next) => {
    //                |
    //                ------------------------------------------
    //                                                          |
    axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.pokeId}`)
        .then(responseFromAPI => {
            console.log("><>><<<><><><><><> ", responseFromAPI.data);

            data = {
                pokes: responseFromAPI.data,
                isSaur: true
            };

            if (!responseFromAPI.data.name.includes('saur')) {
                data.isSaur = false;
            }

            res.render('apiViews/apiDetails', data);
        }).catch(err => next(err));
});

module.exports = router;