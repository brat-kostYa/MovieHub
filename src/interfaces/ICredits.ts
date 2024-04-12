export interface ICredits {
	id: number
	cast: ICast[]
	crew: ICrew[]
}

interface ICrew extends Team {
	credit_id?: string
	department: string
	job: string
}

export interface ICast extends Team {
	cast_id: number
	character: string
	credit_id: string
	order: number
}

interface Team {
	adult: boolean
	gender: number
	id: number
	known_for_department: string
	name: string
	original_name: string
	popularity: number
	profile_path?: string
}
