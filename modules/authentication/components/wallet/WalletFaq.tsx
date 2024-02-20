import Accordion from "@/modules/shared/components/ui/Accordion";

const WalletFaq: React.FC = () => {

    const items = [
        {
            title: `کیف پول سفرانه چیست؟`,
            content: `کیف پول سفرانه یک راه عالی برای کسب پاداش و پرداخت هزینه برای هتل و رزرو پرواز با سهولت است. شما می توانید با استفاده از یکی از کدهای ویژه کوپن ما در دوره های تبلیغاتی امتیاز Wallet کسب کنید و با بازخرید امتیاز خود مبلغ کمتری را برای رزرو بعدی خود بپردازید! این به عنوان ذخیره سازی مجازی تخفیف های شما در قالب امتیاز عمل می کند. بسته به پیشنهاد ، ممکن است یک کد کوپن تقسیم شده دریافت کنید که می توانید علاوه بر بازپرداخت به عنوان امتیاز اضافه شده به کیف پول خود ، تخفیف فوری در رزرو فعلی خود بگیرید. برخی از پیشنهادات ممکن است فقط بدون تخفیف بازپرداخت بدهد. امتیازهایی که کسب می کنید به کیف پول شما اضافه می شود و در مقدار معادل AED نمایش داده می شود. هر امتیاز کسب شده برابر با AED 1. می توانید با رفتن به بخش "کیف پول من" در زیر "حساب من" در وب سایت ما ، و تحت "مایه" در برنامه و PWA (وب تلفن همراه) به کیف پول خود دسترسی پیدا کنید.`
        },
        {
            title: "چگونه می توانم امتیاز کیف پول کسب کنم؟",
            content: `می توانید با استفاده از کد ویژه کوپن هنگام انجام رزرو خود از طریق نسخه امارات وب سایت و برنامه ما و همچنین مرکز تماس ما امتیازات کیف پول را بدست آورید. در وب و برنامه: 1. شما هنگام انجام رزرو باید وارد سیستم شوید. اگر حساب خود را تأیید کنید ، می توانید بلافاصله دوباره امتیاز Wallet خود را بازخرید کنید. اگر گذرواژه خود را فراموش کرده اید ، برای تنظیم مجدد آن روی "رمز عبور فراموش شده" کلیک کنید. 2. هتل یا پرواز مورد نظر خود را انتخاب کنید. 3.در صفحه پرداخت ، کد ویژه کوپن تبلیغاتی واجد شرایط برای کسب امتیاز کیف پول را اعمال کنید. اگر این کد کوپن تقسیم شده باشد ، تخفیف فوری از کل شما کسر می شود (در صورت وجود) ، و امتیازهای کیف پول کسب شده شما پس از اتمام پرداخت به حساب شما اضافه می شود. اگر این فقط یک کد کوپه برای بازپرداخت باشد ، امتیازها به کیف پول شما اضافه می شوند. از طریق مرکز تماس ما: 1.در حین تهیه رزرو ، به مشاور سفر اطلاع دهید که می خواهید امتیاز کیف پول را بدست آورید. مشاور شما مراحل لازم را راهنمایی می کند (لطفا اطمینان حاصل کنید که دارید) یک حساب tajawal دارید و از یک کد کوپن استفاده می کنید که واجد شرایط برای کسب امتیاز است) لطفا توجه داشته باشید که نمی توانید در رزرو هتل ‘Pay Later’ امتیاز کسب کنید. فقط رزروهایی که بلافاصله پرداخت می شوند واجد شرایط هستند.`
        },
        {
            title: "چگونه می توانم نقاط Wallet را بازخرید کنم؟",
            content: `می توانید امتیازات کیف پول را فقط در رزروهایی که از طریق نسخه امارات متحده عربی وب سایت ما انجام شده است ، بازخرید. 1.بعد از رزرو ، باید وارد سیستم شوید و حساب کاربری خود را تأیید کنید. اگر گذرواژه خود را فراموش کرده اید ، برای تنظیم مجدد آن روی "رمز عبور فراموش شده" کلیک کنید. 2. هتل یا پرواز مورد نظر خود را انتخاب کنید. 3.در صفحه پرداخت ، کیف پول در صورت داشتن مانده ، به عنوان گزینه پرداخت نمایش داده می شود. اگر کیف پول را به عنوان روش پرداخت انتخاب می کنید ، می توانید مبلغ مورد نظر را برای بازخرید (با توجه به موجودی کیف پول خود) تعیین کنید. این مبلغ از کل شما کسر می شود. مبلغ باقیمانده (در صورت وجود) باید با کارت یا Apple Pay (در iOS) پرداخت شود. لطفاً توجه داشته باشید که نمی توانید امتیاز خود را در رزرو هتل "پرداخت بعد" پرداخت کنید. فقط رزروهایی که بلافاصله پرداخت می شوند واجد شرایط هستند.`
        },
        {
            title: "آیا می توانم هزینه های خود را به طور کامل با امتیازات Wallet پرداخت کنم؟",
            content: `بله ، با امتیازات کیف پول می توانید به طور کامل پرداخت کنید. لطفاً توجه داشته باشید که اگر تعداد رزرو شما دارای اعشار باشد ، به عنوان مثال AED 1000.50 ، سپس نقاط مورد استفاده به شرح زیر گرد می شوند: • اگر .50 یا بیشتر از 50 باشد - دور. یک امتیاز اضافی از مانده حساب Wallet شما کسر خواهد شد (طبق مثال بالا ، 1001 امتیاز از شما شارژ می شود) • اگر 0.49 یا کمتر از 49 باشد - دور پایین. رقم اعشاری باقیمانده توسط تاجاوال پوشانده می شود (طبق مثال فوق ، شما 1000 امتیاز دریافت می کنید و تاجاوال از مقدار باقیمانده مراقبت می کند)`
        },
        {
            title: "برای استفاده از امتیازات کیف پول چه نوع هزینه هایی را می توان پرداخت کنم؟",
            content: `در وب و برنامه ، کلیه رزرو پرواز و رزرو هتل که بلافاصله پرداخت کرده اند واجد شرایط هستند. نقاط کیف پول را نمی توان در رزرو بسته های تعطیلات و رزرو هتل "Pay Later" خریداری کرد. اگر از وب سایت یا برنامه استفاده می کنید ، لطفاً مطمئن شوید که امارات متحده عربی را به عنوان کشور منتخب خود در اختیار دارید.`
        },
        {
            title: "آیا می توانم هنگام بازپرداخت امتیاز کیف پول از یک کد کوپن یا هر تخفیف دیگری استفاده کنم؟",
            content: `خیر ، از نقاط کیف پول در رابطه با کد کوپن یا تخفیف های خودکار استفاده نمی شود.`
        }
    ]
    return (
        <div>
            {items.map(item => (
                <Accordion
                    title={item.title}
                    content={item.content}
                    key={item.title}
                    WrapperClassName="mt-5"
                />
            ))}
        </div>
    )
}

export default WalletFaq;