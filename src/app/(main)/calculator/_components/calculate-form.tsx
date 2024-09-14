"use client";

import {Label, Lead, Span} from "@/components/typography";
import {Callout} from "@/components/ui/callout";
import {Highlight} from "@/components/ui/highlight";
import {Input} from "@/components/ui/input";
import {Select} from "@/components/ui/select";
import {SubmitButton} from "@/components/ui/submit-button";
import {Flex, type FlexProps, RadioGroup} from "@radix-ui/themes";
import {useFormState} from "react-dom";
import {calculate} from "../actions";

function FormGroup(props: FlexProps) {
	return <Flex direction="column" {...props} />;
}

export function CalculateForm() {
	let [state, action] = useFormState(calculate, null);
	return (
		<Flex direction="column" gap="3" width="100%">
			<form action={action} className="w-full">
				<Flex direction="column" asChild gap="5">
					<fieldset className="w-full rounded-md border-2 border-gray-900/55 p-2 shadow-md">
						<Label asChild weight="bold">
							<legend>Daily Calorie Intake Calculator</legend>
						</Label>
						<Flex gap="8" px="3">
							<FormGroup direction="column" flexGrow="1" gap="0">
								<Label weight="medium" htmlFor="age">
									Age
								</Label>
								<Input
									type="number"
									name="age"
									id="age"
									min={5}
									defaultValue={5}
									required
								/>
							</FormGroup>
							<RadioGroup.Root name="gender" highContrast required defaultValue="male">
								<Label weight="medium" htmlFor="gender">
									Gender
								</Label>

								<FormGroup direction="row" align="center" className="h-full" gap="5">
									<RadioGroup.Item id="male" value="male">
										Male
									</RadioGroup.Item>
									<RadioGroup.Item id="female" value="female">
										Female
									</RadioGroup.Item>
								</FormGroup>
							</RadioGroup.Root>
						</Flex>
						<Flex gap="3" px="3">
							<FormGroup flexGrow="1">
								<Label weight="medium" htmlFor="weight">
									Weight
									<Span className="text-sm"> (kg)</Span>
								</Label>
								<Input
									type="number"
									name="weight"
									id="weight"
									min={20}
									max={400}
									required
								/>
							</FormGroup>
							<FormGroup flexGrow="1">
								<Label weight="medium" htmlFor="height">
									Height
									<Span className="text-sm"> (cm)</Span>
								</Label>
								<Input
									type="number"
									name="height"
									id="height"
									min={100}
									max={250}
									required
								/>
							</FormGroup>
						</Flex>
						<ActivityAndGoalSelects />
						<SubmitButton highContrast type="submit" size="3">
							<Span weight="bold">Calculate</Span>
						</SubmitButton>
					</fieldset>
				</Flex>
			</form>
			{state?.ok && (
				<Callout type="info" className="flex items-center" size="1">
					<Lead size="4" color="blue">
						You need{" "}
						<Highlight className="after:bottom-0 after:bg-blue-900/20">
							{state.result}
						</Highlight>{" "}
						calories per day to reach your goal.
					</Lead>
				</Callout>
			)}
		</Flex>
	);
}

function ActivityAndGoalSelects() {
	return (
		<Flex gap="3" px="3">
			<FormGroup flexGrow="1">
				<Label weight="medium">Activity Level</Label>
				<Select defaultValue="light" required name="activity-level">
					<Select.Trigger />
					<Select.Content>
						<Select.Group>
							<Select.Label>Activity Level</Select.Label>
							<Select.Item value="sedentary">Sedentary</Select.Item>
							<Select.Item value="light">Light</Select.Item>
							<Select.Item value="moderate">Moderate</Select.Item>
							<Select.Item value="active">Active</Select.Item>
							<Select.Item value="very-active">Very active</Select.Item>
						</Select.Group>
					</Select.Content>
				</Select>
			</FormGroup>
			<FormGroup flexGrow="1">
				<Label weight="medium">Goal</Label>
				<Select defaultValue="maintain" required name="goal">
					<Select.Trigger />
					<Select.Content>
						<Select.Group>
							<Select.Label>Goal</Select.Label>
							<Select.Item value="maintain">Maintain</Select.Item>
							<Select.Item value="lose">Lose</Select.Item>
							<Select.Item value="gain">Gain</Select.Item>
						</Select.Group>
					</Select.Content>
				</Select>
			</FormGroup>
		</Flex>
	);
}
