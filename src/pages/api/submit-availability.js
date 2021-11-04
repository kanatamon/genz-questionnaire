// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const {data: checkAvailabilityResult} = await axios.get(
        'https://www1.reg.cmu.ac.th/asama/cmusurvey/checkTime.php',
      )
      return res.status(200).json({
        isOk: checkAvailabilityResult.isOK,
      })
    } catch (error) {
      return res.status(500).json({
        isOk: false,
        message: 'Service not available',
      })
    }
  }

  return res.status(405).json({
    message: 'Method Not Allowed',
  })
}
