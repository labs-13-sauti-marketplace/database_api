


async function getSession(router){
    router.post('/', (req, res) => {
        res.status(201).json(req.body)
    })
}

module.exports = getSession;

