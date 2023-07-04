import { IResourceComponentsProps } from "@refinedev/core";
import { Button, Form, Input, Tabs, Table, Select } from "antd";
import { useState, useRef, useEffect } from "react";
import apiHelper from "utility/apiHelper";

const { TabPane } = Tabs;

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  const [formValues, setFormValues] = useState({});
  const [activeTab, setActiveTab] = useState("1");
  const [contactDetails, setContactDetails] = useState([]);

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

        formRef.current.setFieldsValue(data);
        setContactDetails(data.contactDetails);
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

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Designation', dataIndex: 'designation', key: 'designation' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
      title: 'Actions',
      dataIndex: '_id',
      key: 'actions',
      render: (id: string) => <Button onClick={() => handleDelete(id)}>Delete</Button>,
    },
  ];

  const handleDelete = (id: string) => {
    // Perform delete operation for the given id
    console.log('Delete contact with ID:', id);
  };

  return (
    <Form
      ref={formRef}
      onFinish={handleFormSubmit}
      initialValues={formValues}
    >
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="About" key="1">
          <Form.Item
            label="Company Name"
            name={['about', 'name']}
            rules={[{ required: true, message: 'Company Name is required' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Industry"
            name={['about', 'industry']}
            rules={[{ required: true, message: 'Industry is required' }]}
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
          <Form.Item
            label="Website"
            name={['about', 'website']}
            rules={[
              { required: true, message: 'Website is required' },
              { type: 'url', message: 'Invalid URL' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Employee Strength"
            name={['about', 'employeeStrength']}
            rules={[{ required: true, message: 'Employee Strength is required' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </TabPane>
        <TabPane tab="Contact Details" key="2">
          <Form form={formRef.current} onFinish={handleFormSubmit}>
    <Form.Item
      label="Title"
      rules={[
        { required: true, message: "Title is required" },
        {
          validator: (_, value) => {
            if (!value) {
              return Promise.reject("Title is required");
            } else {
              return Promise.resolve();
            }
          },
        },
      ]}
    >
      <Select>
        <Select.Option value="Mr">Mr</Select.Option>
        <Select.Option value="Mrs">Mrs</Select.Option>
        <Select.Option value="Miss">Miss</Select.Option>
        <Select.Option value="Ms">Ms</Select.Option>
      </Select>
    </Form.Item>

    <Form.Item
      label="Name"
      rules={[{ required: true, message: "Name is required" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Phone Number"
      rules={[{ required: true, message: "Phone number is required" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      rules={[{ required: true, message: "Email is required" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Designation"
      rules={[{ required: true, message: "Designation is required" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit"/>
    </Form.Item>
  </Form>

          <Table
            dataSource={contactDetails}
            columns={columns}
            pagination={false}
          />
          <Form.Item>
            <Button onClick={handlePrev}>Previous</Button>
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </Form.Item>
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
  <Form.Item
    label="Year of Registration"
    name={['legalInformation', 'yearOfRegistration']}
    rules={[{ required: true, message: 'Year of registration is required' }]}
  >
    <Input type="number" />
  </Form.Item>
  <Form.Item
    label="TIN"
    name={['legalInformation', 'tin']}
    rules={[{ required: true, message: 'TIN is required' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="Last Financial Year Turnover"
    name={['legalInformation', 'lastFinancialYearTurnover']}
    rules={[{ required: true, message: 'Last financial year turnover is required' }]}
  >
    <Input type="number" />
  </Form.Item>
  <Form.Item
    label="Registration Address"
    name={['legalInformation', 'registrationAddress', 'line1']}
    rules={[{ required: true, message: 'Registration address line 1 is required' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="Registration Address Line 2"
    name={['legalInformation', 'registrationAddress', 'line2']}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="City"
    name={['legalInformation', 'registrationAddress', 'city']}
    rules={[{ required: true, message: 'City is required' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="State"
    name={['legalInformation', 'registrationAddress', 'state']}
    rules={[{ required: true, message: 'State is required' }]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    label="Pincode"
    name={['legalInformation', 'registrationAddress', 'pincode']}
    rules={[{ required: true, message: 'Pincode is required' }]}
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
