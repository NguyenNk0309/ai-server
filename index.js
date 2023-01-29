const express = require('express')
const bodyParser = require('body-parser')
const env = require('dotenv')
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai')
const app = express()

env.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

// ======================================================================================

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

app.get('/image', async function (req, res) {
	try {
		const prompt = req.query.prompt
		const response = await openai.createImage({
			prompt,
			n: 1,
			size: '1024x1024',
		})
		image_url = response.data.data[0].url
		res.json({ prompt, imageUrl: image_url })
	} catch (err) {
		res.json(err)
	}
})

app.listen(process.env.PORT || 5000)
