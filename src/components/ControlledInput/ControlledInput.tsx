import { errorsTypes, green, inputTypes } from "../../utils/constants";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./ControlledInput.module.scss";
import { ControlledInputProps, OptionObj } from "../../utils/types/types";

function ControlledInput({
	errors,
	name,
	isRequired,
	rules,
	control,
	label,
	type,
	variety,
	selectOptions,
	placeholder,
	...props
}: ControlledInputProps) {
	const { t } = useTranslation();

	return (
		<Form.Group className={`${styles.form} ${styles.animate}`}>
			<Form.Label className={styles.label}>
				{t(label)} {isRequired && <span className={styles.danger}>*</span>}
			</Form.Label>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange, value, ref } }) => (
					<>
						{!type && (
							<Form.Control
								as="input"
								className={`p-2`}
								type={variety ?? "text"}
								style={{ borderColor: value && !errors[name] ? green : "" }}
								placeholder={`${placeholder && t(placeholder)}`}
								ref={ref}
								isInvalid={errors[name]}
								onChange={onChange}
								value={value}
								{...props}
							/>
						)}
						{type === inputTypes.SELECT_INPUT && selectOptions && (
							<Form.Select
								ref={ref}
								isInvalid={errors[name]}
								onChange={onChange}
								style={{ borderColor: value && !errors[name] ? green : "" }}
								className="p-2"
								value={value}>
								<option value="">{t("selectType")}</option>
								{selectOptions &&
									selectOptions.map((option: OptionObj) => (
										<option key={option.uid} value={option.name}>
											{t(option.name)}
										</option>
									))}
							</Form.Select>
						)}
						{type === inputTypes.TIME_PICKER && (
							<Form.Control
								ref={ref}
								isInvalid={errors[name]}
								onChange={onChange}
								style={{ borderColor: value && !errors[name] ? green : "" }}
								value={value}
								type="time"
								step="1"
								pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
								placeholder="00:00:00"
								{...props}
							/>
						)}
					</>
				)}
			/>
			<Form.Control.Feedback type="invalid">
				{errors[name] &&
					errorsTypes.map((type) => {
						if (errors[name].type === type) {
							return t(type);
						}
						return null;
					})}
			</Form.Control.Feedback>
		</Form.Group>
	);
}

export default ControlledInput;
