import { IResourceComponentsProps } from "@refinedev/core";
import { Button, Form, Input, Tabs } from "antd";
import { useState, useRef, useEffect } from "react";
import apiHelper from "utility/apiHelper";

const { TabPane } = Tabs;

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  const [formValues, setFormValues] = useState({});
  const [activeTab, setActiveTab] = useState("1");

  const handleNext = async () => {
    try {
      if (formRef.current) {
        const form = await formRef.current.validateFields();
        const nextTab = String(Number(activeTab) + 1);
        setActiveTab(nextTab);
      }
    } catch (error) {
      console.log("Form validation failed:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiHelper('get', '/company', null);
        const { data } = response;
        
        formRef.current.setFieldsValue({
          about: {
            name: data.about.name,
            description: data.about.description,
          },
          contactDetails: data.contactDetails.map((contact:any) => ({
            name: contact.name,
            email: contact.email,
          })),
          legalInformation: data.legalInformation.map((info:any) => ({
            companyType: info.companyType,
            registrationNumber: info.registrationNumber,
          })),
          offices: data.offices.map((office:any) => ({
            address: [
              {
                line1: office.address[0].line1,
                city: office.address[0].city,
              },
            ],
            contact: [
              {
                phoneNumber: office.contact[0].phoneNumber,
                email: office.contact[0].email,
              },
            ],
          })),
        });
        
        setFormValues(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePrev = () => {
    const prevTab = String(Number(activeTab) - 1);
    setActiveTab(prevTab);
  };

  const handleFormSubmit = (values: any) => {
    setFormValues(values);
    console.log("Form values:", values);
  };

  const formRef = useRef<any>(null);

  return (
    <Form
      ref={formRef}
      onFinish={handleFormSubmit}
      initialValues={formValues}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="About" key="1">
          <Form.Item
            label="Name"
            name={['about', 'name']}
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name={['about', 'description']}
            rules={[{ required: true, message: 'Description is required' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </TabPane>
        <TabPane tab="Contact Details" key="2">
          <Form.Item
            label="Name"
            name={['contactDetails', 0, 'name']}
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name={['contactDetails', 0, 'email']}
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Button onClick={handlePrev}>Previous</Button>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </TabPane>
        <TabPane tab="Legal Information" key="3">
          <Form.Item
            label="Company Type"
            name={['legalInformation', 'companyType']}
            rules={[{ required: true, message: 'Company type is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Registration Number"
            name={['legalInformation', 'registrationNumber']}
            rules={[{ required: true, message: 'Registration number is required' }]}
          >
            <Input />
          </Form.Item>
          <Button onClick={handlePrev}>Previous</Button>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </TabPane>
        <TabPane tab="Offices" key="4">
          <Form.Item
            label="Address Line 1"
            name={['offices', 0, 'address', 'line1']}
            rules={[{ required: true, message: 'Address line 1 is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="City"
            name={['offices', 0, 'address', 'city']}
            rules={[{ required: true, message: 'City is required' }]}
          >
            <Input />
          </Form.Item>
          <Button onClick={handlePrev}>Previous</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </TabPane>
      </Tabs>
    </Form>
  );
};
