import * as v1 from './resume.js'
import * as v2 from './resumeV2.js'

const path = typeof window !== 'undefined' ? window.location.pathname : '/'
const version = /^\/v2\/?$/.test(path) ? 'v2' : /^\/v1\/?$/.test(path) ? 'v1' : 'v3'
const src = version === 'v1' ? v1 : v2

export { version }
export const isV2 = version === 'v2'
export const profile = src.profile
export const contact = src.contact
export const experience = src.experience
export const projects = src.projects
export const skillGroups = src.skillGroups
export const softSkills = src.softSkills
export const education = src.education
export const languages = src.languages
export const sectionNum = src.sectionNum
export const ai = version === 'v1' ? null : src.ai
