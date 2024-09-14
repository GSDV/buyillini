import Paragraphs from "@components/Paragraphs";
import VerticalLayout from "@components/containers/VerticalLayout";



export default function Page() {
    const paragraphs = [
        "By signing up for BuyIllini, you confirm that you are at least 18 years old.",
        "BuyIllini is not affiliated with the University of Illinois.",
        "BuyIllini exists as a platform to show items for sale and connect buyers to sellers. Actual transactions occur outside of BuyIllini.",
        "BuyIllini is not responsible for purchases made. BuyIllini cannot verify authenticity, quality, or condition of sold items.",
        "BuyIllini reserves the right to delete a post at any time for any reason. Reasons include, but are not limited to: spam posts, vulgar language, inappropriate or unrelated pictures, and selling counterfeit or stolen items. BuyIllini also reserves the right to delete or make inactive accounts at any time for any reason."
    ];

    return (
        <VerticalLayout>
            <h1>Terms and Conditions of BuyIllini</h1>
            <Paragraphs paragraphs={paragraphs} />
        </VerticalLayout>
    );
}