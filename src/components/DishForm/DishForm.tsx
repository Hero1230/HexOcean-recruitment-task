import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ControlledInput from "../ControlledInput/ControlledInput";
import { useTranslation } from "react-i18next";
import styles from "./DishForm.module.scss";
import { dishTypes, inputTypes } from "../../utils/constants";
import { useEffect, useState } from "react";
import { Dish } from "../../utils/types/types";
import { useAddOrder } from "./query";
import { toast } from "react-hot-toast";
import { validateInput } from "../../utils/validation/validation";

const DishForm = () => {
	const [showDishInputs, setShowDishInputs] = useState("");

	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<Dish>();

	const { t } = useTranslation();
	const typeInputVal = watch("type");

	const resetFields = () =>
		reset({
			diameter: "",
			name: "",
			no_of_slices: "",
			preparation_time: "",
			slices_of_bread: "",
			spiciness_scale: "",
			type: "",
		});

	const addOrder = useAddOrder();

	const mutateHandler = (data: Dish) => {
		addOrder.mutate(data, {
			onSuccess: () => {
				toast.success(t("successDishPost"));
				resetFields();
			},
			onError: (error: any) => {
				console.log(error);
				for (const errorMessage in error?.response?.data) {
					toast.error(error?.response?.data[errorMessage]);
				}
			},
		});
		return;
	};

	useEffect(() => {
		if (!typeInputVal) {
			setShowDishInputs("");
			return;
		}
		setShowDishInputs(typeInputVal);
	}, [typeInputVal]);

	return (
		<Form
			className={`m-4 mt-2 ${styles.form}`}
			onSubmit={handleSubmit(mutateHandler)}>
			<div className="col">
				<ControlledInput
					errors={errors}
					name={"name"}
					rules={{
						required: true,
						maxLength: 255,
						minLength: 1,
						validate: validateInput,
					}}
					isRequired={true}
					control={control}
					label={"dishName"}
					placeholder={"selectDishName"}
				/>
			</div>
			<div className="row">
				<div className="col">
					<ControlledInput
						errors={errors}
						name={"preparation_time"}
						rules={{ required: true, pattern: /[0-9]{2}:[0-9]{2}:[0-9]{2}/ }}
						type={inputTypes.TIME_PICKER}
						isRequired={true}
						control={control}
						label={t("preparationTime")}
					/>
				</div>
				<div className="col">
					<ControlledInput
						errors={errors}
						name={"type"}
						type={inputTypes.SELECT_INPUT}
						selectOptions={dishTypes}
						rules={{ required: true }}
						isRequired={true}
						control={control}
						label={t("dishType")}
						placeholder={"selectDishType"}
					/>
				</div>
			</div>
			{showDishInputs === dishTypes[0].name && (
				<div className="row">
					<div
						className={`col ${styles["mount-animation"]}`}
						style={{ animationDelay: "0.5s" }}>
						<ControlledInput
							errors={errors}
							name={"no_of_slices"}
							variety="number"
							min={1}
							max={100}
							rules={{ required: true, min: 1, max: 100 }}
							isRequired={true}
							control={control}
							label={t("slicesNo")}
							placeholder={"selectSlicesNo"}
						/>
					</div>
					<div className={`col ${styles["mount-animation"]}`}>
						<ControlledInput
							errors={errors}
							name={"diameter"}
							rules={{ required: true, min: 10 }}
							isRequired={true}
							variety="number"
							step="0.01"
							control={control}
							min="10"
							label={t("diameter")}
							placeholder={"selectDiameter"}
						/>
					</div>
				</div>
			)}
			{showDishInputs === dishTypes[1].name && (
				<div className={`col ${styles["mount-animation"]}`}>
					<ControlledInput
						errors={errors}
						name={"spiciness_scale"}
						variety="number"
						rules={{ required: true, min: 1, max: 10 }}
						isRequired={true}
						control={control}
						max={10}
						min={1}
						label={t("spiciness")}
						placeholder={"selectSpiciness"}
					/>
				</div>
			)}
			{showDishInputs === dishTypes[2].name && (
				<div className={`col ${styles["mount-animation"]}`}>
					<ControlledInput
						errors={errors}
						name={"slices_of_bread"}
						variety="number"
						rules={{ required: true, min: 1, max: 50 }}
						isRequired={true}
						control={control}
						max={50}
						min={1}
						label={t("breadSlices")}
						placeholder={"enterBreadSlices"}
					/>
				</div>
			)}
			<div className={`${styles["actions-container"]} p-1`}>
				<Button
					variant="secondary"
					disabled={false}
					type="submit"
					className={"btn"}>
					{t("submit")}
				</Button>
			</div>
		</Form>
	);
};

export default DishForm;
