'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthContext } from '@components/providers/Auth';
import { Alert, AlertType, AlertVariation } from '@components/Alert';
import { CheckIfLoading } from '@components/Loading';

import formStyles from '@styles/ui/form.module.css';



interface FormInputType {
    title: string;
    name: string;
    type: React.HTMLInputTypeAttribute;
}

interface FormData {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignUp() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const { fetchCookie } = useAuthContext();

    const [formData, setFormData] = useState<FormData>({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const inputs: FormInputType[] = [
        {title: 'Name', type: 'text', name: 'displayName'},
        {title: 'Email', type: 'text', name: 'email'},
        {title: 'Password', type: 'password', name: 'password'},
        {title: 'Confirm Password', type: 'password', name: 'confirmPassword'}
    ];

    const [alert, setAlert] = useState<AlertType | null>(null);
    const alertVars: AlertVariation[] = [
        {cStatus: 405, jsx: (<p>This account already exists. Please <a href='/login'>log in</a>.</p>)}
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const attemptSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            setAlert({cStatus: 102, msg: `Passwords don't match.`})
            setLoading(false);
            return;
        }

        const userData = {
            displayName: formData.displayName,
            email: formData.email,
            password: formData.password
        };

        try {
            const res = await fetch(`/signup/api`, {
                method: 'POST',
                body: JSON.stringify({userData}),
                headers: { 'Content-Type': 'application/json' }
            });
            const resJson = await res.json();
            console.log(resJson);
            if (resJson.cStatus==200) {
                fetchCookie();
                router.push(`/signup/success/`);
            } else {
                setAlert(resJson);
            }
        } catch (error) {
            setAlert({cStatus: 500, msg: 'An error occurred. Please try again.'});
        } finally {
            setLoading(false);
        }
    }

    return (
        <CheckIfLoading loading={loading} content={
            <div className={formStyles.container}>
                <h2 className={formStyles.title}>Sign up for BuyIllini</h2>
                <SignUpForm 
                    action={attemptSignUp} 
                    inputs={inputs} 
                    formData={formData}
                    handleInputChange={handleInputChange}
                />
                {alert && <Alert alert={alert} variations={alertVars} />}
            </div>
        }/>
    );
}



interface FormProps {
    action: (e: React.FormEvent<HTMLFormElement>) => void;
    inputs: FormInputType[];
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SignUpForm({ action, inputs, formData, handleInputChange }: FormProps) {
    return (
        <form className={formStyles.form} onSubmit={action}>
            {inputs.map((input, i) => ( 
                <div key={i} className={formStyles.formItem}>
                    <h4>{input.title}</h4>
                    <input 
                        type={input.type} 
                        name={input.name} 
                        autoComplete={input.name}
                        value={formData[input.name as keyof FormData]}
                        onChange={handleInputChange}
                    />
                </div>
            ))}

            <h5 style={{ width: '250px', textAlign: 'center' }}>
                By signing up, you agree to the <a href='/terms-and-conditions/' target='_blank'>Terms</a> and <a href='/privacy-policy/' target='_blank'>Privacy Policy</a> of BuyIllini.
            </h5>

            <div style={{ padding: '20px',  display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button style={{ alignSelf: 'center' }} type='submit'>Sign up</button>
                <h5 style={{ textAlign: 'center' }}>Click <a href='/login/'>here</a> to login</h5>
            </div>
        </form>
    );
}