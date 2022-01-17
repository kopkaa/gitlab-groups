import dotenv from 'dotenv'
dotenv.config()

export const GET_GROUP_URL = (id) => {
	return `${process.env.API_URL}/groups/${id}?private_token=${process.env.ACCESS_TOKEN}`
}
export const GET_SUBGROUP_URL = (id) => {
	return `${process.env.API_URL}/groups/${id}/subgroups?private_token=${process.env.ACCESS_TOKEN}`
}
export const GET_GROUP_MEMBERS_URL = (id) => {
	return `${process.env.API_URL}/groups/${id}/members?private_token=${process.env.ACCESS_TOKEN}`
}
export const GET_GROUP_PROJECTS_URL = (id) => {
	return `${process.env.API_URL}/groups/${id}/projects?private_token=${process.env.ACCESS_TOKEN}`
}
export const GET_PROJECT_MEMBERS_URL = (id) => {
	return `${process.env.API_URL}/projects/${id}/members?private_token=${process.env.ACCESS_TOKEN}`
}