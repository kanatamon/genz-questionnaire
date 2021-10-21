import * as QuestionnairesUtils from './questionnaires-utils'

const RESPONDINGS_TEMPLATE_KEY = 'RESPONDINGS_TEMPLATE'
const REGISTERING_GROUPS_KEY = 'REGISTERING_GROUPS'

export function saveAllRespondingsTemplate(respondingsTemplate) {
  const savingData = JSON.stringify(respondingsTemplate)
  localStorage.setItem(RESPONDINGS_TEMPLATE_KEY, savingData)
}

export function getAllRespondingsTemplate() {
  const rawRespondingsTemplate = localStorage.getItem(RESPONDINGS_TEMPLATE_KEY)

  if (typeof rawRespondingsTemplate !== 'string') {
    resetResponding()
    return getAllRespondingsTemplate()
  }

  return JSON.parse(rawRespondingsTemplate)
}

export function getRespondingByQuestionId(questionId) {
  const respondingsTemplate = getAllRespondingsTemplate()
  return respondingsTemplate[questionId]
}

export function patchRespondingByQuestionId(questionId, patch) {
  const memoryResponding = getRespondingByQuestionId(questionId)
  const patchedResponding = {...memoryResponding, ...patch}
  const respondingsTemplate = getAllRespondingsTemplate()
  respondingsTemplate[questionId] = patchedResponding

  saveAllRespondingsTemplate(respondingsTemplate)
}

export function saveRegisteredGroups(registeringGroups) {
  const savingData = JSON.stringify(registeringGroups)
  localStorage.setItem(REGISTERING_GROUPS_KEY, savingData)
}

export function getRegisteredGroups() {
  const rawRegisteredGroups = localStorage.getItem(REGISTERING_GROUPS_KEY)

  if (!rawRegisteredGroups) {
    return []
  }

  const registeredGroups = JSON.parse(rawRegisteredGroups)

  return Array.isArray(registeredGroups) ? registeredGroups : []
}

export function saveAttendeeEmail(email) {
  localStorage.setItem('ATTENDEE_EMAIL_KEY', email)
}

export function getAttendeeEmail() {
  const attendeeEmail = localStorage.getItem('ATTENDEE_EMAIL_KEY')
  return attendeeEmail
}

export function saveAttendeeName(name) {
  localStorage.setItem('ATTENDEE_NAME_KEY', name)
}

export function getAttendeeName() {
  const attendeeEmail = localStorage.getItem('ATTENDEE_NAME_KEY')
  return attendeeEmail
}

export function resetResponding() {
  const newRespondingsTemplate =
    QuestionnairesUtils.generateNewRespondingsTemplate()
  saveAllRespondingsTemplate(newRespondingsTemplate)
  saveRegisteredGroups([])
}

export function resetAll() {
  localStorage.clear()
  resetResponding()
}

export function calculateProgress() {
  const allRespondings = getAllRespondingsTemplate()
  const registeredGroups = getRegisteredGroups()

  const numOfAllRequiredQuestions = Object.values(allRespondings).filter(
    responding =>
      checkIsRequiredForRegisteringGroups(responding, registeredGroups),
  ).length

  const numOfAllRespondedQuestions = Object.values(allRespondings).filter(
    checkIsRespondedQuestion,
  ).length

  return numOfAllRespondedQuestions / numOfAllRequiredQuestions
}

function checkIsRespondedQuestion(responding) {
  return (
    responding.respondingText !== null ||
    responding.respondingOptions.length > 0
  )
}

function checkIsRequiredForRegisteringGroups(responding, registeredGroups) {
  const {showForGroups = [], isRequired} = responding

  if (!isRequired) {
    return false
  }

  const isRequiredQuestion =
    registeredGroups.length === 0 || showForGroups.length === 0

  if (isRequiredQuestion) {
    return true
  }

  const isRequiredQuestionForCurrentRegisteringGroups = registeredGroups.some(
    registeredGroup => showForGroups.includes(registeredGroup),
  )

  return isRequiredQuestionForCurrentRegisteringGroups
}
