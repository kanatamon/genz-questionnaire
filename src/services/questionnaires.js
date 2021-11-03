import * as QuestionnairesUtils from '../questionnaires-utils'
import * as ClientMemory from '../client-memory'

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const responseData = await response.json()
  return responseData
}

function formatToServerOptions(respondingOptions) {
  return respondingOptions.map(option => ({
    answer: option.respondingText,
    weight: option.weight,
    is_other: +option.isOther,
    other_detail: option.respondingOtherText,
  }))
}

function formatToServerResponseDetails(allRespondingsTemplate) {
  return Object.values(allRespondingsTemplate).map(responding => {
    const {
      sectionSlug,
      type,
      title,
      respondingText,
      showForGroups,
      respondingOptions,
    } = responding

    const options = formatToServerOptions(respondingOptions)

    return {
      section_id:
        QuestionnairesUtils.getServerSectionIdBySectionSlug(sectionSlug),
      no_id: +responding.questionIndex + 1,
      anstype: QuestionnairesUtils.getServerAnswerTypeByRespondingType(type),
      question: title,
      answer: respondingText,
      group_name: showForGroups?.join() ?? null,
      options,
    }
  })
}

export async function submitAllRespondingsToServer() {
  const attendeeContact = ClientMemory.getAttendeeContact()

  const allRespondingsTemplate = ClientMemory.getAllRespondingsTemplate()
  const responseDetails = formatToServerResponseDetails(allRespondingsTemplate)

  const submittingData = {
    qid: 'GenZ',
    response_details: responseDetails,
    ...attendeeContact,
  }

  const submittingResult = await postData('/api/questionnaires', submittingData)

  return submittingResult
}
