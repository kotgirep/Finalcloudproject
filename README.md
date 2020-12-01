# Cineverse
## San Jose State University
### CMPE-281 : Cloud Technologies

### Professor: Sanjay Garje
### ISA: Indrayani Bhalerao
### Group Name: CLOUD CHRONICLES
### Team Members: Bhavya Tetali, Pranjali Kotgire, Supriya Meduri

#### Project Introduction

For movie lovers, Cineverse is a one stop solution. This web application helps users to keep track of their favorite shows, discover something to watch, and create their own watchlist. Our personal MOVIE BUFF assistant can help to discover movies and suggests based on users interest.

#### AWS Components 
AWS Lex Bot: This service is used to enhance user experience and user interaction by using a chatbot that helps to discover movies.

EC2: Create a EC2 instance , configure the web server to route all the api requests. Create an elastic IP address to have a fixed public IP of our instance .

AutoScaling Group: Configure the auto scaling policy to make the system highly-available and application that can scale to configured max instances with a desired instance of 1 and max instance of 3. we can change these configs anytime in the autoscaling policy based on the Params like CPU Util, network in out, data rates etc.

Application Load Balancer: Load balancer transfer request in the round robin fashion to multiple EC2 instances spawned under the target groups.

S3: This service is used to store the web Ui of Lex chatbot. Enabled cross region replication for disaster recovery.

Route 53: This is the Domain Name Server which is used to resolve the IP address of the application domain.

CloudWatch: This will be used to create monitoring for the ec2, RDS,lambda etc when the CPU utilization of ec2 instances will reach at high or low threshold also when the free storage space limit threshold is reached it sends the notification via SNS.

Lambda: This service is used for writing the serverless backend functionality for lex UI.

SNS: It is the Simple Notification Service for AWS resources which sends email and text messages on the particular top gets the configured events.

Amazon Cognito: Create the userpool for users to sign up or sign in to the application 

RDS: Launch a MySQL instance and connect to the workbench where user data regarding different lists will be saved.Created read replicas to have high availability and failover support. 

Cloud Formation:  This service provides a template to build and deploy the AWS Lex web interface automatically. The web application is configured and deployed directly to the S3 bucket utilizing Code Build. The cloud Formation stack links to an iframe embedded in our application.

#### Local Configuration
Prerequisite Softwares: NodeJS
Clone the code from git
Run npm install on NodeJS project to install all the dependencies.
Create the .env file with all the access and secret keys(MovieDB, AWS) in NodeJS project.
Run the NodeJS API using npm start command.
NodeJS project listens on port 3000

#### Kibana Dashboard set up
Install Nginx 
Install Elastic-search and kibana 
Install filebeat 
Configure Filebeat to point to Elastic-search and Kibana
Modified nginx.yml in modules.d in Filebeat to point to correct access and error logs.
Run Filebeat

##### Git Repo: https://github.com/kotgirep/Finalcloudproject/tree/master
##### Website URL: http://cineverse.ga
##### Demo Link: https://www.youtube.com/watch?v=G_4F4fJBK2g&feature=youtu.be
##### Test Account Credentials : supriyameduri@gmail.com / Apple@123

#### Architecture Diagram
 ![FinalCloudProject (1)](https://user-images.githubusercontent.com/71044935/100682302-a3855780-332a-11eb-9b38-9cbe57f07d8c.png)


#### Sample Demo Screenshots

##### Sign Up page

<img width="1440" alt="Screen Shot 2020-11-30 at 4 44 13 PM" src="https://user-images.githubusercontent.com/71044935/100682609-50f86b00-332b-11eb-957e-054cc6d0597d.png">


##### Login page 
<img width="1440" alt="Screen Shot 2020-11-30 at 4 44 58 PM" src="https://user-images.githubusercontent.com/71044935/100682714-8c933500-332b-11eb-8451-ba4e39140b9f.png">


##### Home Page 
<img width="2560" alt="Screen Shot 2020-11-30 at 4 46 45 PM" src="https://user-images.githubusercontent.com/71044935/100682783-b0567b00-332b-11eb-901a-455ca6180e57.png">


##### Movie Details page 
<img width="2560" alt="Screen Shot 2020-11-30 at 4 48 42 PM" src="https://user-images.githubusercontent.com/71044935/100682890-f14e8f80-332b-11eb-9f67-1eefd10110cf.png">

##### Chat Bot
##### Watch List 
##### Favorite List


##### Application monitoring through Kibana
<img width="1418" alt="kibana Dashboard 1" src="https://user-images.githubusercontent.com/71044935/100683540-68d0ee80-332d-11eb-9281-03729dcb0d2f.png">

<img width="1420" alt="Kibana Dashboard 2" src="https://user-images.githubusercontent.com/71044935/100683604-869e5380-332d-11eb-9919-47e0149511ac.png">







