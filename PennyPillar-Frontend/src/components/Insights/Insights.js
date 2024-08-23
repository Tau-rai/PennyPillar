import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import './Insights.css';
import MainFooter from '../ComponentFooter';
import Topnav from '../TopNav';



const InsightsPage = () => {
    const [insights, setInsights] = useState([]);

    useEffect(() => {
        axiosInstance.get('/insights/')
            .then(response => {
                setInsights(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the insights!', error);
            });
    }, []);

    return (
        <>
         <Topnav />
       
        <div>
            <h1>Daily Financial Insights</h1>
            {insights.map((insight, index) => (
                <div key={index} className="insight-item">
                    <div dangerouslySetInnerHTML={{ __html: insight.formatted_content }} />
                    <p><em>{new Date(insight.date_posted).toLocaleDateString()}</em></p>
                </div>
            ))}
            
        </div>
        <MainFooter />
        </>
    );
};

export default InsightsPage;
