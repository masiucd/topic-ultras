import PageWrapper from "@/components/page-wrapper";
import {H1, Span} from "@/components/typography";
import {Input} from "@/components/ui/input";
import {Select} from "@/components/ui/select";
import {Button, Flex, RadioGroup} from "@radix-ui/themes";
import {calculate} from "./actions";

/**
 * Calculator page
 * Where the user can calculate their daily intake of nutrients and calories based on their goals and activity level
 */
export default function CalculatorPage() {
	return (
		<PageWrapper>
			<H1>CalculatorPage</H1>
			<Flex maxWidth="500px" className="border border-red-500">
				<form action={calculate} className="w-full">
					<Flex direction="column" asChild gap="5" className="w-full bg-blue-300">
						<fieldset>
							<legend>Personal information</legend>
							<Flex gap="3">
								<div>
									<label htmlFor="age">Age</label>
									<Input
										type="number"
										name="age"
										id="age"
										min={5}
										defaultValue={5}
										required
									/>
								</div>
								<RadioGroup.Root name="gender" highContrast required defaultValue="male">
									<Flex align="center" className="h-full" gap="5">
										<RadioGroup.Item id="male" value="male">
											Male
										</RadioGroup.Item>
										<RadioGroup.Item id="female" value="female">
											Female
										</RadioGroup.Item>
									</Flex>
								</RadioGroup.Root>
							</Flex>
							<Flex gap="3">
								<div>
									<label htmlFor="weight">
										Weight
										<Span className="text-sm"> (kg)</Span>
									</label>
									<Input
										type="number"
										name="weight"
										id="weight"
										min={20}
										max={400}
										required
									/>
								</div>
								<div>
									<label htmlFor="height">
										Height
										<Span className="text-sm"> (cm)</Span>
									</label>
									<Input
										type="number"
										name="height"
										id="height"
										min={100}
										max={250}
										required
									/>
								</div>
							</Flex>
							<Flex gap="3">
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
							</Flex>
							<Button highContrast type="submit" size="3">
								<Span weight="bold">Calculate</Span>
							</Button>
						</fieldset>
					</Flex>
				</form>
			</Flex>
		</PageWrapper>
	);
}
