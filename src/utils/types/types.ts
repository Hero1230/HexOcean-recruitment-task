export interface WatchedValues {
	type: string;
}

export interface OptionObj {
	uid: string;
	name: string;
}

export interface ControlledInputProps {
	errors: any;
	name: string;
	isRequired?: boolean;
	rules: any;
	control: any;
	label: string;
	type?: string;
	variety?: string;
	selectOptions?: OptionObj[];
	placeholder?: string;
	[key: string]: any;
}

export interface Dish {
	diameter?: string;
	name: string;
	no_of_slices?: string;
	preparation_time: string;
	slices_of_bread?: string;
	spiciness_scale?: string;
	type: string;
}
