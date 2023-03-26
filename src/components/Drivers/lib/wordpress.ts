class Wordpress{
    private tableprefix = process.env.TABLEPREFIX
    private conn: any;
    private navid: number;

    constructor(props :any) {
        this.conn = props;
        this.navid = 3;
    }

    getConfiguration(name:string):string
    {
        var query = `SELECT option_value as value FROM `+this.tableprefix+`options WHERE option_name="${name}"`;
        var result = this.conn.runQuery(query);
        return "done";
    }

    // Get all pages, main menu, footer menu where status published
    async getIntData(){
        var pages = {};
        var dataresult = {
            pages:{},
            menus:{}
        };
        var query = `SELECT post_title,post_excerpt,post_name,post_content,post_type,
                    (
                        select GROUP_CONCAT(DISTINCT meta_key,meta_value ORDER BY meta_id SEPARATOR ':') 
                        from `+this.tableprefix+`postmeta where post_id=ID AND 
                        (meta_key="seo_meta_title" OR meta_key="seo_meta_description" OR meta_key="seo_meta_keyword") GROUP BY post_id
                    ) as SEO
                    FROM `+this.tableprefix+`posts as p  WHERE post_status="publish" AND post_type="page"`

        await this.conn.runQuery(query,[],'all').then((results:any) => {

            // if there is no error, you have the result
            // iterate for all the rows in result
            Object.keys(results).forEach(function(key) {
                if(key!='meta') {
                    var seoresult: { [key: string]: string } = {};
                    seoresult.meta_title = results[key].post_title;
                    seoresult.meta_description = results[key].excerpt;
                    seoresult.meta_keyword = results[key].post_title;

                    if (results[key].SEO != null) {
                        var tmp = results[key].SEO.split(":");
                        tmp.forEach((element: string, index: number) => {
                            if (element.indexOf("seo_meta_title") >= 0) {
                                seoresult.meta_title = element.replace("seo_meta_title", "");
                            }
                            if (element.indexOf("seo_meta_description") >= 0) {
                                seoresult.meta_description = element.replace("seo_meta_description", "");
                            }
                            if (element.indexOf("seo_meta_keyword") >= 0) {
                                seoresult.meta_keyword = element.replace("seo_meta_keyword", "");
                            }
                        })
                    }

                    results[key].SEO = seoresult;
                }
            });
            dataresult.pages=results;
        })

        var menuquery = `select * from (select d.*,e.name,e.slug from
                         (
                             SELECT p.id,txr.term_taxonomy_id, p.post_title, p.post_name, p.menu_order, n.post_name as n_name, 
                                 n.post_title as n_title, pp.meta_value as menu_parent,pt.meta_value as type
                         FROM wp_term_relationships as txr
                             INNER JOIN `+this.tableprefix+`posts as p ON txr.object_id = p.ID
                             LEFT JOIN `+this.tableprefix+`postmeta as m ON p.ID = m.post_id
                             LEFT JOIN `+this.tableprefix+`postmeta as pl ON p.ID = pl.post_id AND pl.meta_key = '_menu_item_object_id'
                             LEFT JOIN `+this.tableprefix+`postmeta as pp ON p.ID = pp.post_id AND pp.meta_key = '_menu_item_menu_item_parent'
                             LEFT JOIN `+this.tableprefix+`postmeta as pt ON p.ID = pt.post_id AND pt.meta_key = '_menu_item_object'
                             LEFT JOIN `+this.tableprefix+`posts as n ON pl.meta_value = n.ID
                         WHERE p.post_status='publish'
                           AND p.post_type = 'nav_menu_item' AND m.meta_key = '_menu_item_url'
                         ORDER BY pp.meta_value) d
                             LEFT JOIN `+this.tableprefix+`terms as e on d.term_taxonomy_id=e.term_id) i where i.term_taxonomy_id = `+this.navid;
        await this.conn.runQuery(menuquery,[],'all').then((results:any) => {
            var newresults:any = [];
            Object.keys(results).forEach(function(key) {
                if(key!='meta') {
                    newresults[key] = results[key];
                    newresults[key].term_taxonomy_id = Number(results[key].term_taxonomy_id)
                    newresults[key].id = Number(results[key].id)
                }
            })
            dataresult.menus=newresults;
        });
        return dataresult;
    }

    async getPostByName(name:string)
    {
        //select GROUP_CONCAT(DISTINCT meta_key,meta_value ORDER BY meta_id SEPARATOR ':')
        // from wp_postmeta where post_id=1 AND (`meta_key`="seo_meta_title" OR `meta_key`="seo_meta_description") GROUP BY `post_id`
        var returndata = {};
        var query = `SELECT post_title,post_excerpt,post_name,post_content,
                    (
                        select GROUP_CONCAT(DISTINCT meta_key,meta_value ORDER BY meta_id SEPARATOR ':') 
                        from `+this.tableprefix+`postmeta where post_id=ID AND 
                        (meta_key="seo_meta_title" OR meta_key="seo_meta_description" OR meta_key="seo_meta_keyword") GROUP BY post_id
                    ) as SEO
                    FROM `+this.tableprefix+`posts as p  WHERE post_name="${name}" AND post_status="publish" AND post_type="post"`

        await this.conn.runQuery(query).then((results:any) => {
            const seoresult: { [key: string]: string } = {};
            seoresult.meta_title=results.post_title;
            seoresult.meta_description=results.excerpt;
            seoresult.meta_keyword=results.post_title;

            if(results.SEO!=null) {
                var tmp = results.SEO.split(":");
                tmp.forEach((element: string, index: number) => {
                    if (element.indexOf("seo_meta_title") >= 0) {
                        seoresult.meta_title = element.replace("seo_meta_title", "");
                    }
                    if (element.indexOf("seo_meta_description") >= 0) {
                        seoresult.meta_description = element.replace("seo_meta_description", "");
                    }
                    if (element.indexOf("seo_meta_keyword") >= 0) {
                        seoresult.meta_keyword = element.replace("seo_meta_keyword", "");
                    }
                })
            }
            results.SEO = seoresult;
            returndata=results;
        })
        return returndata;
    }
}

export default Wordpress;