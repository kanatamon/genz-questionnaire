import * as questionnairesMetadata from './questionnaires-metadata'

export function getAllQuestionsParams() {
  const {SECTIONS} = questionnairesMetadata

  const allQuestionParams = Object.keys(SECTIONS).flatMap(sectionSlug =>
    SECTIONS[sectionSlug].questions.map((_question, questionIndex) => ({
      sectionSlug,
      questionIndex: `${questionIndex}`,
    })),
  )

  return allQuestionParams
}

export function generateQuestionLink({sectionSlug, questionIndex}) {
  return `/questionnaires/${sectionSlug}/${questionIndex}`
}

export function getQuestionByQuestionParams({sectionSlug, questionIndex}) {
  const {SECTIONS} = questionnairesMetadata
  return SECTIONS?.[sectionSlug]?.questions?.[questionIndex]
}

export function generateQuestionId({sectionSlug, questionIndex}) {
  return `${sectionSlug}:${questionIndex}`
}

export function generateNewRespondingsTemplate() {
  const allQuestionsParams = getAllQuestionsParams()

  const respondingsTemplate = allQuestionsParams.reduce(
    (creatingTemplate, questionParams) => {
      const respondingId = generateQuestionId(questionParams)
      const question = getQuestionByQuestionParams(questionParams)

      return {
        ...creatingTemplate,
        [respondingId]: {
          ...questionParams,
          type: question.type,
          title: question.title,
          showForGroups: question.showForGroups,
          respondingText: null,
          respondingOptions: [],
          isRequired: question.isRequired ?? true,
        },
      }
    },
    {},
  )

  return respondingsTemplate
}

export function generateAllQuestionsMap() {
  const allQuestionsParams = getAllQuestionsParams()

  const allQuestionsMap = allQuestionsParams.reduce(
    (creatingObject, questionParams) => {
      const questionId = generateQuestionId(questionParams)
      const question = getQuestionByQuestionParams(questionParams)
      const questionLink = generateQuestionLink(questionParams)

      return {
        ...creatingObject,
        [questionId]: {
          link: questionLink,
          showForGroups: question.showForGroups,
        },
      }
    },
    {},
  )

  return allQuestionsMap
}

export function generateFirstQuestionLink() {
  const {SECTION_GENERAL_INFORMATION} = questionnairesMetadata
  return `/questionnaires/${SECTION_GENERAL_INFORMATION}/0`
}

export function generateGetStartedQuestionLink() {
  return `${generateFirstQuestionLink()}?isGetStarted`
}

export function generateGetStartedWithoutClearingContactQuestionLink() {
  return `${generateFirstQuestionLink()}?isGetStartedWithoutClearingContact`
}

export function getSectionDisplayIndexBySectionSlug(slug) {
  return questionnairesMetadata.SECTION_DISPLAY_INDEX[slug]
}

export function getServerSectionIdBySectionSlug(slug) {
  return questionnairesMetadata.SERVER_SECTION_IDS[slug]
}

export function getServerAnswerTypeByRespondingType(respondingType) {
  return questionnairesMetadata.SERVER_ANSWERS_TYPES[respondingType]
}
