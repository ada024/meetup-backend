import {Fragment} from 'react';
import Link from "next/link";

function NewsPage() {
    return (<Fragment>

        <h1>The News Main Page</h1>
        <ul>
            <li><Link href='/news/nextjs-isa-great-framework'>NextJS is a promising framework</Link></li>
            <li>Something Else</li>
        </ul>
    </Fragment>);
}

export default NewsPage;

