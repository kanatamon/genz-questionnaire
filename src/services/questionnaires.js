import * as QuestionnairesUtils from '../questionnaires-utils'
import * as ClientMemory from '../client-memory'
import {postData} from './http-tools'

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
  const registeredGroups = ClientMemory.getRegisteredGroups()

  const allRespondingsTemplate = ClientMemory.getAllRespondingsTemplate()
  const responseDetails = formatToServerResponseDetails(allRespondingsTemplate)

  const submittingData = {
    qid: 'GenZ',
    response_details: responseDetails,
    answer_group: registeredGroups?.[0] ?? null,
    ...attendeeContact,
  }

  const submittingResult = await postData('/api/questionnaires', submittingData)

  return submittingResult
}
