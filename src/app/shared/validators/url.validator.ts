
export class UrlValidator {
    
    public static testUrl(txtUrl: string): string {
        try {
            const test = this.isValidPattern(txtUrl);
            if(!test) {
                throw new Error('Invalid url!');
            }
            new URL(txtUrl);
            return '';
        } catch(error) {
            throw new Error('Invalid url!')
        }
    }

    private static isValidPattern(str: string) {
        const pattern = new RegExp(
          '^(http(s*)?\:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
          'i'
        );
        return pattern.test(str);
    }

}