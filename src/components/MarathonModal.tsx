import {
  Modal,
  Stack,
  TextInput,
  Radio,
  Select,
  Checkbox,
  Alert,
  Button,
  Text,
  Divider,
  Group,
} from "@mantine/core";
import { useMarathonFormStore } from "../store/MarathonFormStore";
import { useEffect,useState } from "react";
import { type MarathonModalProps } from "../libs/Marathon";

import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { marathonSchema } from "../zod/MarathonSchema";

export default function MarathonModal({ opened, onClose }: MarathonModalProps) {
  const [agree, setAgree] = useState(false);
  const {
    fname,
    lname,
    plan,
    gender,
    buyBottle,
    buyShoes,
    buyCap,
    total,
    email,
    setFname,
    setLname,
    setPlan,
    setGender,
    setBuyBottle,
    setBuyShoes,
    setBuyCap,
    setEmail,
    computeTotalPayment,
    reset,
  } = useMarathonFormStore();

  const onSubmitRegister = () => {
    alert("register success");
    onClose();
    reset();
    //agree:false;
  };

const marathonForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      fname,
      lname,
      plan,
      gender,
      buyBottle,
      buyShoes,
      buyCap,
    //total, //ไม่ใข่ Form
    email,
    // email: '',
      //termsOfService: false, 
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
    validate:zod4Resolver(marathonSchema),
    validateInputOnChange: true, // เช็คแบบ real time
  });

useEffect(()=>{
  computeTotalPayment();
},[marathonForm.values]);
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Register CMU Marathon 🏃‍♂️"
      centered
      size="xl"
    >
       {/* <form onSubmit={marathonForm.onSubmit((values) => console.log(values))}> */}
       <form onSubmit={marathonForm.onSubmit(onSubmitRegister)}>
        <Stack>
        <Group justify="space-between" gap="xs" grow>
          <TextInput
            label="First name"
            withAsterisk
            value={fname}
            onChange={(e) => {
              setFname(e.currentTarget.value);
              marathonForm.setFieldValue("fname", e.currentTarget.value);
            }}
            error={marathonForm.errors.fname}
            //error={!fname.trim() && "First name is required"}
          />
          <TextInput
            label="Last name"
            withAsterisk
            value={lname}
            onChange={(e) => {
              setLname(e.currentTarget.value)
              marathonForm.setFieldValue("lname", e.currentTarget.value);
            }}
            error={marathonForm.errors.lname}
            //error={!lname.trim() && "Last name is required"}
          />
        </Group>
        <TextInput
          label="Email"
          withAsterisk // *
          description="ex.excemble@email.com"
          // key={marathonForm.key('email')}
          // {...marathonForm.getInputProps('email')}
          value={email}
          onChange={(e)=>{
            setEmail(e.currentTarget.value);
            marathonForm.setFieldValue("email", e.currentTarget.value);
          } // e คือ event
          }
          error={marathonForm.errors.email}
        />
        <Select
          label="Plan"
          placeholder="Please select.."
          data={[
            { value: "funrun", label: "Fun run 5.5 Km (500 THB)" },
            { value: "mini", label: "Mini Marathon 10 Km (800 THB)" },
            { value: "half", label: "Half Marathon 21 Km (1,200 THB)" },
            { value: "full", label: "Full Marathon 42.195 Km (1,500 THB)" },
          ]}
          value={plan}
          onChange={(value) => {
            if (value) setPlan(value as "funrun" | "mini" | "half" | "full");
            marathonForm.setFieldValue("plan", value as "funrun" | "mini" | "half" | "full");
          }}
          error={marathonForm.errors.plan}
          //error={!plan ? "Plan is required" : false}
        />

        <Radio.Group
          label="Gender"
          value={gender}
          onChange={(value) => {
            if (value) setGender(value as "male" | "female");
            marathonForm.setFieldValue("gender", value as "male" | "female");
          }}
          error={marathonForm.errors.gender}
          //error={!plan ? "Gender is required" : false}
        >
          <Radio m={4} value="male" label="Male 👨" />
          <Radio m={4} value="female" label="Female 👩" />
        </Radio.Group>
        <Checkbox
          label="Bottle 🍼 (200 THB)"
          checked={buyBottle} //ค่า buyBottle มาจาก Zustand
          onChange={(e) => {
            setBuyBottle(e.currentTarget.checked);
            marathonForm.setFieldValue("buyBottle", e.currentTarget.checked);
          }}
        />
        <Checkbox
          label="Shoes 👟 (600 THB)"
          checked={buyShoes} //ค่า buyBottle มาจาก Zustand
          onChange={(e) => {
            setBuyShoes(e.currentTarget.checked);
            marathonForm.setFieldValue("buyShoes", e.currentTarget.checked);
          }}
        />
        <Checkbox
          label="Cap 🧢 (400 THB)"
          checked={buyCap} //ค่า buyBottle มาจาก Zustand
          onChange={(e) => {
            setBuyCap(e.currentTarget.checked);
            marathonForm.setFieldValue("buyCap", e.currentTarget.checked);
          }}
        />
        <Alert color="blue" title="Promotion 📢">
          Buy all items to get 20% Discount
        </Alert>

        <Text>Total Payment : {total} THB</Text>
        <Divider my="xs" variant="dashed" />
        <Checkbox
          label={
            <>
              I accept
              <Text mx={2} span c="red" inherit>
                terms and conditions
              </Text>
            </>
          }
          checked={agree}
          onChange={(e) => {
            setAgree(e.currentTarget.checked);
            marathonForm.setFieldValue("agree", e.currentTarget.checked);
          }}
        />
        <Button type="submit" disabled={!agree}> {/*  ต้องใสา type="submit"*/}
          Register
        </Button>
        </Stack>
       </form>
    </Modal>
  );
}
