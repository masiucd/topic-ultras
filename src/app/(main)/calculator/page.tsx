import PageWrapper from "@/components/page-wrapper";
import {H1} from "@/components/typography";
import {Flex} from "@radix-ui/themes";

/**
 * Calculator page
 * Where the user can calculate their daily intake of nutrients and calories based on their goals and activity level
 */
export default function CalculatorPage() {
	return (
		<PageWrapper>
			<H1>CalculatorPage</H1>
			<Flex asChild gap="3">
				<form action="">
					<fieldset>
						<legend>Personal information</legend>
						<div>
							<label htmlFor="age">Age</label>
							<input type="number" name="age" id="age" />
						</div>
						<div>
							<label htmlFor="gender">
								Male
								<input type="radio" name="gender" id="male" value="male" />
							</label>
							<label htmlFor="female">
								Female
								<input type="radio" name="gender" id="female" value="female" />
							</label>
						</div>
						<div>
							<label htmlFor="weight">Weight</label>
							<input type="number" name="weight" id="weight" />
						</div>
						<div>
							<label htmlFor="height">Height</label>
							<input type="number" name="height" id="height" />
						</div>
						<div>
							<label htmlFor="activity-level">Activity level</label>
							<select name="activity-level" id="activity-level">
								<option value="sedentary">Sedentary</option>
								<option value="light">Light</option>
								<option value="moderate">Moderate</option>
								<option value="active">Active</option>
								<option value="very-active">Very active</option>
							</select>
						</div>
						<div>
							<label htmlFor="goal">Goal</label>
							<select name="goal" id="goal">
								<option value="maintain">Maintain</option>
								<option value="lose">Lose</option>
								<option value="gain">Gain</option>
							</select>
						</div>
					</fieldset>
				</form>
			</Flex>
		</PageWrapper>
	);
}
