"use client";

import { Card, Typography } from "antd";
import styles from "./polices.module.css";
const { Title, Paragraph, Text } = Typography;
export const PoliciesPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Card className={styles.container}>
        <Title level={2} className="text-black! text-center text-3xl! font-bold!" >Company Policies</Title>
        <Typography>
          <Title className="text-black! text-xl! font-semibold!" level={4}>1. Employee Conduct Policies</Title>
          <Paragraph className="text-gray-600! text-base! leading-5.5!">
            One of the types of company policy is Employee conduct policies. An
            employee conduct policy establishes the duties and responsibilities
            each employee must adhere to as a condition of employment. Conduct
            policies are in place as a guideline for appropriate employee
            behavior, and they outline things such as proper dress code,
            workplace safety procedures, harassment policies and policies
            regarding computer and Internet usage. Such policies also outline
            the procedures employers may utilize to discipline inappropriate
            behavior, including warnings or employee termination. Companies are
            increasingly paying attention to bullying behavior as a serious
            issue and beginning to adopt policies in this area as well.
            Anti-bullying policies focus on repeated hostile behaviors, identify
            reporting mechanisms and describe the consequences for employees who
            engage in persistent bullying behavior.
          </Paragraph>
          <Title className="text-black! text-xl!  font-semibold!" level={4}>2. Equal Opportunity Policies</Title>
          <Paragraph className="text-gray-600! text-base! leading-5.5!">
            Equal opportunity laws are rules that promote fair treatment in the
            workplace. Most organizations implement equal opportunity policies
            – anti-discrimination and affirmative action policies, for example –
            to encourage unprejudiced behavior within the workplace. These
            policies discourage inappropriate behavior from employees,
            supervisors and independent contractors in regard to race, gender,
            sexual orientation or religious and cultural beliefs of another
            person within the organization.
          </Paragraph>

          <Title className="text-black! text-xl!  font-semibold!"  level={4}>3. Attendance and Time Off Policies</Title>
          <Paragraph className="text-gray-600! text-base! leading-5.5!">
            Attendance policies set rules and guidelines surrounding employee
            adherence to work schedules. Attendance policies define how
            employees may schedule time off or notify superiors of an absence or
            late arrival. This policy also sets forth the consequences for
            failing to adhere to a schedule. For example, employers may allow
            only a certain number of absences within a specified time frame. The
            attendance policy discusses the disciplinary action employees face
            if they miss more days than the company allows.
          </Paragraph>
          <Title className="text-black! text-xl!  font-semibold!"  level={4}>4. Substance Abuse Policies</Title>
          <Paragraph className="text-gray-600! text-base! leading-5.5!">
            Many companies have substance abuse policies that prohibit the use
            of drugs, alcohol and tobacco products during work hours, on company
            property or during company functions. These policies often outline
            smoking procedures employees must follow if allowed to smoke on
            business premises. Substance abuse policies also discuss the testing
            procedures for suspected drug and alcohol abuse.
          </Paragraph>
          <Title className="text-black! text-xl!  font-semibold!" level={4}>5. Workplace Security Policies</Title>
          <Paragraph className="text-gray-600! text-base! leading-5.5!">
            Policies on security are in place to protect not only the people in
            an organization, but the physical and intellectual property as well.
            Policies may cover entrance to a facility, such as the use of ID
            cards and the procedures for signing in a guest. Equipment such as a
            company laptop or smartphone may need to be signed out. Computer
            security is a high priority for firms these days. Policies cover a
            variety of topics, such as the frequency for changing passwords,
            reporting phishing attempts and log-on procedures. Use of personal
            devices, such as a USB drive you bring from home, may also be
            restricted to prevent unintended spread of computer viruses and
            other malware. 
          </Paragraph>
          <Paragraph className="text-center! py-3"> 
            <Text className="text-black! text-2xl!" strong>How to create Company Policies?</Text>
          </Paragraph>
          <Title className="text-black! text-xl!  font-semibold!"  level={4}> 1. Articulate the policy goals</Title>
          <Paragraph className="text-gray-600! text-base! leading-5.5!">
            One of the first ways on how to create company policies is by
            articulating the policy goals. Once you've determined that the
            company policy for employees is necessary, document in writing your
            goals for creating the policy. When possible, tell employees why you
            are implementing the policy. Include enough details to make the
            company's position clear, but don't try to cover every potential
            situation. Keep the policy short and simple if possible. Some
            policies about legal areas—such as the company's approach to the
            Family and Medical Leave Act, discrimination or complaint
            investigation, or the progressive discipline system—may need to be
            lengthy and comprehensive.
          </Paragraph>

          <Title className="text-black! text-xl!  font-semibold!"  level={4}> 2. Gather information</Title>
          <Paragraph className="text-gray-600! text-base! leading-5.5!">
            Check out sample policies. You may not find an exact fit for your
            company's circumstances, language, and culture, but you can use
            these as a starting point. You don't have to start from scratch.
            The Society for Human Resources Management (SHRM) provides policy
            samples for its members. Other sources are your employment law
            attorneys. Law firms typically write generic policies their clients
            can customize whenever a relevant law passes or the U.S. Department
            of Labor issues new rules.
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};
