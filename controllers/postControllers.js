export default class PostController {
    
    async get(req, res) {
        const query = req.query
        res.json(query)

    }
    
    async getId(req, res) {
        const {id} =req.query
        res.json(id)
    }

    async postNew (req, res) {
        res.json('postNew')

    }

    async toPost (req, res) {
        res.json('toPostt')

    }

    async toDelete (req, res) {
        res.json('toDelete')

    }
}


