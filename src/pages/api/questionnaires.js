// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await axios.post(
        'https://www1.reg.cmu.ac.th/asama/cmusurvey/savedata.php',
        req.body,
      )
      return res.status(200).json({
        isSuccess: true,
        message: 'Submitted questionnaires successfully',
      })
    } catch (error) {
      return res.status(500).json({
        isSuccess: false,
        message: 'Submitted questionnaires failed',
      })
    }
  }
}
